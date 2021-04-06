## Section 4 - Surface Critical Server Errors for Diagnosis Using Centralized Logging

Errors and unhealthy states are important to know about, wouldn’t you say? But, too often, server errors are silenced by hasty reboots or simply never having an outlet in the first place. If a server has an error in a forest, but no one is there to hear it, did it actually happen? Why is the server in the forest in the first place? 

UdaPeople chose Prometheus as a monitoring solution since it is open-source and versatile. Once configured properly, Prometheus will turn our server’s errors into sirens that no one can ignore.  

### Setup

Please watch the [video walkthrough of how to set up your EC2 instance and Prometheus here](https://www.youtube.com/watch?v=PSXrbE54FqQ).

- Manually create an EC2 instance and SSH into it.
- Set up Prometheus Server on EC2 following [these instructions](https://codewizardly.com/prometheus-on-aws-ec2-part1/).
- Configure Prometheus for AWS Service Discovery following [these instructions](https://codewizardly.com/prometheus-on-aws-ec2-part3/).

### To Do

#### 1. Setup Back-End Monitoring

In order for server instances to speak to Prometheus, we need to install an “exporter” in each one.  Create a job that uses Ansible to go into the EC2 instance and install the exporter.

![Graphs of CPU, Disk and Memory utilization on systems being monitored.](screenshots/SCREENSHOT11.png)

- Add a section to your back-end configuration job to install the `node_exporter` for Prometheus monitoring. This should be done using Ansible. Your playbook can simulate the steps in [this tutorial](https://codewizardly.com/prometheus-on-aws-ec2-part2/). 
- After deploy, ensure your back-end is being discovered by the Prometheus Server.
- Provide a screenshot of a graph of your EC2 instance including available memory, available disk space, and CPU usage. **[SCREENSHOT11]**
- Provide a public URL to your Prometheus Server. **[URL05]**

#### 2. Setup Alerts

Now that Prometheus and our EC2 instance have an open line of communication, we need to set up some alerts. The UdaPeople dev team loves their chat tool and wants to receive an alert in chat when the server starts running out of memory or disk space. Set up a job to make that dream a reality.

![Alerts from a failing system that is being monitored.](screenshots/SCREENSHOT12.png)

- SSH into your Prometheus Server
- Install and configure AlertManager by following [these instructions](https://codewizardly.com/prometheus-on-aws-ec2-part4/).
- You can decide if you will use Slack, email, or another messaging service. Our examples are using Slack, but you should feel free to use the messaging service to which you are most accustomed.
- Set up an alert for low memory or some condition you can control to intentionally cause an alert.
- Provide a screenshot of an alert that was sent by Prometheus. **[SCREENSHOT12]**
