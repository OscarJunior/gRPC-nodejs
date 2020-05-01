# gRPC project

# Requirements
* docker
* docker-compose

# Running app
* execute `./script/up.sh`
* enjoy it

# Deployment
* go to `resource-manifests`
* `kubectl create -f grpc-notes-deployment.yaml --record`
* `kubectl create -f grpc-notes-service.yaml`
