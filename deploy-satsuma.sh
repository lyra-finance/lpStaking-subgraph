#!/bin/bash
version=$1
name=$2
GRAPH=${GRAPH:-graph}

$GRAPH deploy $name --version-label $version --node https://app.satsuma.xyz/api/subgraphs/deploy --deploy-key $SATSUMA_KEY subgraph.js