ARG REGISTRY
ARG CLAMAV_IMAGE
ARG TRIVY_IMAGE
ARG BASE_IMAGE
ARG TARGET_IMAGE

FROM $REGISTRY/$CLAMAV_IMAGE as clamav
FROM $REGISTRY/$TRIVY_IMAGE as trivy
FROM $REGISTRY/$BASE_IMAGE as base

FROM $REGISTRY/$TARGET_IMAGE as trivy-stage
ARG TRIVY_SEVERITY
WORKDIR /scans
RUN curl https://raw.githubusercontent.com/olxbr/aws-ecr-push-action/main/X9Containers/.trivyignore --output .trivyignore
COPY .trivyignore /scans/
COPY --from=trivy /usr/local/bin/trivy /usr/local/bin/trivy
RUN trivy filesystem --ignore-unfixed --vuln-type os --severity $TRIVY_SEVERITY --exit-code 0 --no-progress --skip-files usr/local/bin/trivy / | tee image-vulnerabilities-trivy.txt

FROM $REGISTRY/$TARGET_IMAGE as clamscan-stage
WORKDIR /scans
RUN apt update && apt-get install clamav -y
COPY --from=clamav /var/lib/clamav/main.cvd /var/lib/clamav/
COPY --from=clamav /var/lib/clamav/daily.cvd /var/lib/clamav/
COPY --from=clamav /var/lib/clamav/bytecode.cvd /var/lib/clamav/
RUN freshclam
RUN clamscan -r -i --exclude-dir="^/sys" / >> recursive-root-dir-clamscan.txt

FROM base as final-stage
WORKDIR /scans
COPY --from=clamscan-stage /scans/recursive-root-dir-clamscan.txt ./recursive-root-dir-clamscan.txt
COPY --from=trivy-stage /scans/image-vulnerabilities-trivy.txt ./image-vulnerabilities-trivy.txt
