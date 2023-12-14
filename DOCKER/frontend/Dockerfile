FROM node

WORKDIR /frontend

COPY . /frontend/

RUN npm i -g pnpm && pnpm i

EXPOSE 5173

CMD ["npm","start"]



# in order to push the images 
#  first need to chnage the name of the image with the "DOCKER HUB NAME"
#  docker tag frontend:v0.1 mesterumit/f
# rontend:v0.1
# AFTER chnaging the name with your docker hub name and the image name
#  docker push mesterumit/frontend:v0.1