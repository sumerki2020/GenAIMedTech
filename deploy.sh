#!/usr/bin/env bash

export GOOGLE_APPLICATION_CREDENTIALS="sa-key.jsoon"

BUCKET_NAME='genaimedtech'

cd webapp

npm run build

#gsutil -m rsync -r out gs://$BUCKET_NAME/
#gsutil -m setmeta -h "Cache-Control:public, max-age=3600" gs://$BUCKET_NAME/**/*
