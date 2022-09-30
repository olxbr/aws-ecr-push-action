ARG REGISTRY
ARG CLAMAV_IMAGE
ARG TRIVY_IMAGE
ARG GITLEAKS_IMAGE
ARG BASE_IMAGE
ARG TARGET_IMAGE

FROM $REGISTRY/$CLAMAV_IMAGE as clamav
FROM $REGISTRY/$TRIVY_IMAGE as trivy
FROM $REGISTRY/$GITLEAKS_IMAGE as gitleaks
FROM $BASE_IMAGE as base
FROM $REGISTRY/$TARGET_IMAGE as target

FROM base as base-stage
COPY --from=target / ../base-root

FROM base-stage as trivy-stage
ARG TRIVY_SEVERITY
ARG TRIVY_IGNORE_FILE
WORKDIR /scans
RUN apk add --no-cache ca-certificates curl
COPY $TRIVY_IGNORE_FILE .trivyignore
COPY --from=trivy /usr/local/bin/trivy /usr/local/bin/trivy
RUN trivy --debug filesystem --timeout 15m --ignore-unfixed --vuln-type os --severity $TRIVY_SEVERITY --exit-code 0 --no-progress /base-root | tee image-vulnerabilities-trivy.txt

FROM base-stage as clamscan-stage
WORKDIR /scans
RUN apk update && apk upgrade && apk add --no-cache clamav-libunrar clamav
COPY --from=clamav /var/lib/clamav/main.cvd /var/lib/clamav/
COPY --from=clamav /var/lib/clamav/daily.cvd /var/lib/clamav/
COPY --from=clamav /var/lib/clamav/bytecode.cvd /var/lib/clamav/
RUN freshclam
RUN clamscan -ri /base-root >> recursive-root-dir-clamscan.txt

FROM base-stage as gitleaks-stage
ARG WKDIR
WORKDIR /scans
COPY --from=gitleaks /usr/bin/gitleaks /usr/local/bin/gitleaks
RUN touch gitleaks-leaks-result.txt && gitleaks --quiet --path="/base-root/$WKDIR" --no-git --report="gitleaks-leaks-result.txt" --format=CSV --redact --leaks-exit-code=0

FROM base as final-stage
WORKDIR /scans
COPY --from=clamscan-stage /scans/recursive-root-dir-clamscan.txt ./recursive-root-dir-clamscan.txt
COPY --from=trivy-stage /scans/image-vulnerabilities-trivy.txt ./image-vulnerabilities-trivy.txt
COPY --from=gitleaks-stage /scans/gitleaks-leaks-result.txt ./gitleaks-leaks-result.txt
