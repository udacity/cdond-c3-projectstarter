FROM circleci/node:13.8.0

RUN echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu xenial main" | sudo tee -a /etc/apt/sources.list

RUN sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
RUN sudo apt update -y \
    && sudo apt install -y python python-pip ansible

RUN pip install awscli

