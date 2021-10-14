ARG REGISTRY
ARG TRIVY_IMAGE
ARG BASE_IMAGE
ARG TARGET_IMAGE

FROM $REGISTRY/$TRIVY_IMAGE as trivy
FROM $REGISTRY/$BASE_IMAGE as base
FROM $REGISTRY/$TARGET_IMAGE as target

FROM base as base-stage
COPY --from=target / ../base-root

FROM base-stage as trivy-stage
ARG TRIVY_SEVERITY
WORKDIR /scans
COPY .trivyignore /scans/
COPY --from=trivy /usr/local/bin/trivy /usr/local/bin/trivy
RUN trivy filesystem --ignore-unfixed --vuln-type os --severity $TRIVY_SEVERITY --exit-code 0 --no-progress /base-root | tee image-vulnerabilities-trivy.txt

FROM base as final-stage
WORKDIR /scans
COPY --from=trivy-stage /scans/image-vulnerabilities-trivy.txt ./image-vulnerabilities-trivy.txt
