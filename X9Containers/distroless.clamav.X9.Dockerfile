ARG REGISTRY
ARG CLAMAV_IMAGE
ARG BASE_IMAGE
ARG TARGET_IMAGE

FROM $REGISTRY/$CLAMAV_IMAGE as clamav
FROM $REGISTRY/$BASE_IMAGE as base
FROM $REGISTRY/$TARGET_IMAGE as target

FROM base as base-stage
COPY --from=target / ../base-root

FROM base-stage as clamscan-stage
WORKDIR /scans
RUN apk update && apk upgrade && apk add --no-cache clamav-libunrar clamav
COPY --from=clamav /var/lib/clamav/main.cvd /var/lib/clamav/
COPY --from=clamav /var/lib/clamav/daily.cvd /var/lib/clamav/
COPY --from=clamav /var/lib/clamav/bytecode.cvd /var/lib/clamav/
RUN freshclam
RUN clamscan -ri /base-root >> recursive-root-dir-clamscan.txt

FROM base as final-stage
WORKDIR /scans
COPY --from=clamscan-stage /scans/recursive-root-dir-clamscan.txt ./recursive-root-dir-clamscan.txt
