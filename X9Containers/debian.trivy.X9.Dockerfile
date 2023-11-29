ARG TRIVY_IMAGE
ARG BASE_IMAGE
ARG TARGET_IMAGE

FROM $TRIVY_IMAGE as trivy
FROM $BASE_IMAGE as base

FROM $TARGET_IMAGE as trivy-stage
ARG TRIVY_SEVERITY
ARG TRIVY_IGNORE_FILE
WORKDIR /scans
RUN apk add --no-cache ca-certificates curl
COPY $TRIVY_IGNORE_FILE .trivyignore
COPY --from=trivy /usr/local/bin/trivy /usr/local/bin/trivy
RUN trivy --debug filesystem --timeout 15m --ignore-unfixed --vuln-type os --severity $TRIVY_SEVERITY --exit-code 0 --no-progress --skip-files usr/local/bin/trivy / | tee image-vulnerabilities-trivy.txt

FROM base as final-stage
WORKDIR /scans
COPY --from=trivy-stage /scans/image-vulnerabilities-trivy.txt ./image-vulnerabilities-trivy.txt
