# garbing the base image 
FROM node 

# creating the backend folder
WORKDIR /backend

# coppy all the source folder inside of the backend
COPY . /backend/

# to built your aplication
RUN npm install

#  need to create a folder
RUN mkdir -p logs

# decidening the your own PORT
EXPOSE 8000

# this will run only once, when u creating teh folder
CMD ["npm","start"]


#  in terminal 
#  "docker build -t backend ."
#  backedn is teh name of the image we give
# "-t" is givin a tage to image
#  "." dont forget it, it measn to build under this file


# creating our container for our image
# "docker run -d -p 8000:8000 backend"


# docker logs "id"
#  it shows which port is it suppose to be 