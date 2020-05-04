## Give your Application Auto-Deploy Superpowers

In this project, you will prove your mastery of the following learning objectives:

- Explain the fundamentals and benefits of CI/CD to achieve, build, and deploy automation for cloud-based software products.
- Utilize Deployment Strategies to design and build CI/CD pipelines that support Continuous Delivery processes.
- Utilize a configuration management tool to accomplish deployment to cloud-based servers.
- Surface critical server errors for diagnosis using centralized structured logging.

![Diagram of CI/CD Pipeline we will be building.](udapeople-pipeline.png)

### Getting Started

Instructions for how to get a copy of the project running on your local machine.

#### Dependencies

NodeJs v10 or higher

#### Installation

This is a "mono-repository" which means multiple servers or layers exist in the same repository. You'll find the following main folders:

- `./frontend`
- `./backend`

##### 1. Install dependencies in both front-end and back-end folders.

```
cd frontend
npm i
```

```
cd backend
npm i
```

##### 2. Create `.env` file for database connection info.

Add a `.env` file to your `backend` folder with the following contents:

```
NODE_ENV=local
VERSION=1
TYPEORM_CONNECTION=postgres
TYPEORM_MIGRATIONS_DIR=./src/migrations
TYPEORM_ENTITIES=./src/modules/domain/**/*.entity.ts
TYPEORM_MIGRATIONS=./src/migrations/*.ts

# Things you can change if you wish...
TYPEORM_HOST=localhost
TYPEORM_PORT=5532
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=password
TYPEORM_DATABASE=glee
```

You can use your own Postgres server if you wish or you can use the Docker-Compose template we provided in the `./utils` folder.

### Running PostgreSQL in Docker-Compose

For convenience, we have provided a template that you can use to easily run a Postgres database for local testing. To run this template, you'll need to install Docker and Docker-Compose.

To start the database:

```
cd utils
docker-compose up
```

### Testing

We have provided unit tests for both back-end and front-end.

```
cd frontend
npm run test
```

```
cd backend
npm run test
```

## Project Instructions

### Selling CI/CD to your Team/Organization

#### Section 1 - Explain the fundamentals and benefits of CI/CD to achieve, build, and deploy automation for cloud-based software products. 

You are leading a team to develop the UdaPeople product, a revolutionary concept in Human Resources which promises to help small businesses care better for their most valuable resource: their people. Before implementing CI/CD for the UdaPeople product, you need to get authorization from the people who write the checks. Create a proposal in document or presentation form that “sells” the concept of CI/CD to non-technical decision-makers in the UdaPeople organization. For this you will need to step out of your technical world and step into the world of revenue and costs. You will need to translate the benefits of CI/CD from technical language to the values of the business. To appeal to what makes business people tick, you’ll need to focus your attention on benefits that create revenue, protect  revenue, control costs or reduce costs.

The deliverable should be “production-quality”. In other words, it should be good enough to submit to a real boss in a real job. No messy, last minute submissions. You may use public domain or open source templates and graphics if you’d like. But please make sure the content is your own. Your presentation should be no longer than 5 slides. Your boss likes presentations that are short and sweet!

### Deploying Working, Trustworthy Software
#### Section 2 - Utilize Deployment Strategies to Design and Build CI/CD Pipelines that Support Continuous Delivery Processes

#### Setup

##### Starter Code
1. Clone the [starter code](https://github.com/udacity/cdond-c3-projectstarter) to your machine so that you can manipulate the files.
2. Push your code into a repository in your account in Github.

##### Circle CI

Circle CI is but one of many options for CI/CD tools. It is a “software as a service” and has a free account that you can use throughout this project, which is ideal for UdaPeople since it’s a start-up running on a shoestring budget. 

1. Create an account with circleci.com if you haven't already. We recommend the free tier for this course. You can get a free trial of the paid plans, but it’s only for a limited time and may not be enough to complete the course in time.
2. Create a new project in Circle CI using your GitHub repo.
 - Notice the `.circleci` folder. This is where your jobs will go.
3. Ensure a workflow starts with at least one “Hello World” job.

#### To Do

- Make sure commits/pushes to repo trigger the CI/CD pipeline (this should be automatic after connecting CircleCI to your Github repo).

##### 1. Build Phase

The goal of a build phase is to compile or lint the source code to check for syntax errors or unintentional typos in code. It’s your first line of defense against bugs as you attempt to integrate the pieces of your project together. This is especially important to UdaPeople because we don’t want to waste credits or time running other steps if the code can’t even compile.

- Add jobs to the `.circleci/config.yml` file to build/compile both front-end and back-end code (one job for each). 
- You should have separate jobs for front-end and back-end so that failure alerts are more descriptive.
- Job should fail if code cannot be compiled (fail for the right reasons). We have provided an easy-to-fix compile error in the code to prove the jobs fail. Provide a screenshot of jobs that failed because of compile errors. [SCREENSHOT01]
- Fix the compile error so that the pipeline can continue (see code-comment that guides you to the fix).
- A failed build should stop all future jobs.

##### 2. Test Phase

Unit tests are one of the many very important building blocks of a system that enables Continuous Delivery (notice, we didn’t say “the only or most important thing”). UdaPeople believes that tests should come first just like they do in the scientific method. So, if a test fails, it's because the code is no longer trustworthy. Only trustworthy code should get a ticket to continue the ride!

- Add jobs to the config file to run all the unit tests in both layers.
- Again, this should be in separate jobs.
- A unit test job should fail the job and prevent any future jobs from running.
- Individual test failures should appear in the "Test Failures" tab. We have provided one failing test in both front-end and back-end. Provide a screenshot of the failed unit tests in the "Test Failures" tab. [SCREENSHOT02]
- Make sure a failed test stops all future jobs.
- Fix the unit tests and make the job succeed.

##### 3. Analyze Phase

UdaPeople handles some private information like social security numbers, salary amount, etc. It would be a shame if a package with a known vulnerability left a security hole in our application, giving hackers access to that information! That’s why we should include a job that checks for known vulnerabilities every time we check in new code.

- Add jobs to the config file to check for security vulnerabilities in the packages used in the application.
  - Create a simple job to run nodejs commands. The product `npm` comes with an “audit” feature that will check for known package vulnerabilities. Just `cd` into the directory of front-end and back-end and run the following:
```
npm audit --audit-level=critical
```
- Job should fail if any major vulnerabilities are found (fail for the right reasons). We left you an intentional vulnerability to cause a failure. Provide a screenshot of jobs that failed because of vulnerable packages listed. [SCREENSHOT03]
- Fix the vulnerability using the command below and re-run the job.
```
npm audit fix --audit-level=critical --force
```
- A failed analysis should stop all future jobs.

##### 4. Alerts

When a build fails for any reason, the UdaPeople dev team needs to know about it. That way they can jump in and save the day (the day that they almost ruined by checking in bad code… but we digress). We’re going to add an alert so that botched builds raise a nice wavy red flag.

- Integrate Slack, email or another communication tool to receive alerts when jobs fail. 
- Alerts should include a summary of what happened and a link to the job console output for quick troubleshooting.
- Provide a screenshot of an alert from one of your failed builds. [SCREENSHOT04]

#### Section 3 - Utilize a Configuration Management Tool to Accomplish Deployment to Cloud-Based Servers

##### Setup

###### AWS
1. Create and download a new key pair in AWS for CircleCI to use to work with AWS resources.
  -  Tutorial: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair (Option 1: Create a key pair using Amazon EC2)
2. Create IAM user for programmatic access only and copy the id and access keys. 
- Tutorial: https://serverless-stack.com/chapters/create-an-iam-user.html
3. Add a PostgreSQL database in RDS and take note of the connection details (hostname, username, password).
- Tutorial: https://aws.amazon.com/getting-started/tutorials/create-connect-postgresql-db/

###### Circle CI

1. Add SSH Key pair from EC2 as shown [here](https://circleci.com/docs/2.0/add-ssh-key/).

2. Add the following environment variables to your project by navigating to {project name} > Settings > Environment Variables as shown [here](https://circleci.com/docs/2.0/settings/):
  - `AWS_ACCESS_KEY_ID`=(from IAM user with programmatic access)
  - `AWS_SECRET_ACCESS_KEY`= (from IAM user with programmatic access)
  - `TYPEORM_CONNECTION`=`postgres`
  - `TYPEORM_MIGRATIONS_DIR`=`./src/migrations`
  - `TYPEORM_ENTITIES`=`./src/modules/domain/**/*.entity.ts`
  - `TYPEORM_MIGRATIONS`=`./src/migrations/*.ts`
  - `TYPEORM_HOST`={your postgres database hostname in RDS}
  - `TYPEORM_PORT`=`5532` (or the port from RDS if it’s different)
  - `TYPEORM_USERNAME`={your postgres database username in RDS}
  - `TYPEORM_PASSWORD`={your postgres database password in RDS}
  - `TYPEORM_DATABASE`={your postgres database name in RDS}

##### To do

###### 1. Infrastructure Phase

Setting up servers and infrastructure is complicated business. There are many, many moving parts and points of failure. The opportunity for failure is massive when all that infrastructure is handled manually by human beings. Let’s face it. We’re pretty horrible at consistency. That’s why UdaPeople adopted the IaC (“Infrastructure as Code”) philosophy after “Developer Dave” got back from the last DevOps conference. We’ll need a job that executes some CloudFormation templates so that the UdaPeople team never has to worry about a missed deployment checklist item.

- Add jobs to your config file to create your infrastructure using CloudFormation templates. Again, provide a screenshot demonstrating an appropriate job failure (failing for the right reasons). [SCREENSHOT05]
  - New EC2 Instance for back-end
  - Save the new back-end url for later use (the front-end needs it).
  - New S3 Bucket for front-end
  - Save the old bucket arn in case you need it later (for rollback)
- Create an Ansible playbook to set up the backend server.
  - Install Python, if needed
  - Update/upgrade packages
  - Install nodejs
  - Install pm2
  - Configure environment variables
    - ENVIRONMENT=production
    - DB Connection Info
  - Configure PM2 to run back-end server 
- In the back-end deploy job, execute Ansible playbook to configure the instance.
- Provide a url to the Ansible playbook in your github repository. [URL03]

###### 2. Deploy Phase

Now that the infrastructure is up and running, it’s time to configure for dependencies and move our application files over. UdaPeople used to have this ops guys in the other building to make the copy every Friday, but now they want to make a full deploy on every single commit. Luckily for UdaPeople, you’re about to add a job that handles this automatically using Ansible. The ops guy will finally have enough time to catch up on his Netflix playlist.

- Add a job that runs a database migration so that new changes are applied. For this, you will need to add a migration that removes a column to the db table (removing a column should cause the smoke test to fail).
  - Take note of whether or not any new migrations were run. This is useful information if you need to rollback.
- Add a job to build and copy the compiled back-end files to your new EC2 instance. Use Ansible to copy the files. 
- Add a job to prepare the front-end code for distribution and deploy it. 
  - Add the back-end url that you saved earlier to the job's `API_URL` environment variables. 
  - Run another `npm run build` so that the back-end url gets baked into the front-end. 
  - Copy the files to your new S3 Bucket using AWS CLI.
  - Run CloudFormation template to change the origin of your CloudFront distribution to your new bucket.
- Provide the public URL for your CloudFront distribution (aka, your front-end) [URL03]
- Provide the public URL for your back-end server [URL04]

###### 3. Smoke Test Phase

All this automated deployment stuff is great, but what if there’s something we didn’t plan for that made it through to production? What if the UdaPeople website is now down due to a runtime bug that our unit tests didn’t catch? Users won’t be able to access their data! This same situation can happen with manual deployments, too. In a manual deployment situation, what’s the first thing you do after you finish deploying? You do a “smoke test” by going to the site and making sure you can still log in or navigate around. You might do a quick `curl` on the backend to make sure it is responding. In an automated scenario, you can do the same thing through code. Let’s add a job to provide the UdaPeople team with a little sanity check.

- Add a job to make a simple test on both front-end and back-end. Use the suggested tests below or come up with your own. 
  - Check `$API_URL/api/status` to make sure it returns a healthy response.
```
BACKEND_IP=$(aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=backend-${CIRCLE_WORKFLOW_ID:0:7}" \
  --query 'Reservations[*].Instances[*].PublicIpAddress' \
  --output text)
curl "http://${BACKEND_IP}:3030/api/status"
```
  - Check the front-end to make sure it includes a word or two that proves it is working properly.
```
URL="http://udapeople-${CIRCLE_WORKFLOW_ID:0:7}.s3-website-us-east-1.amazonaws.com/#/employees"            
if curl -s ${URL} | grep "Welcome"
then
  return 1
else
  return 0
fi
```
- Provide screenshot for appropriate failure for the smoke test job. [SCREENSHOT06]

###### 4. Rollback Phase

Of course, we all hope every pipeline follows the “happy path.” But any experienced UdaPeople developer knows that it’s not always the case. If the smoke test fails, what should we do? The smart thing would be to hit CTRL-Z and undo all our changes. But is it really that easy? It will be once you build the next job!

- Only trigger rollback jobs if the smoke tests or any following jobs fail. 
- Add a “[command](https://circleci.com/docs/2.0/reusing-config/#authoring-reusable-commands)” that rolls back the last change:
  - Destroy the current CloudFormation stack
  - Revert the last migration (IF a new migration was applied) on the database to that it goes back to the way it was before.
- No more jobs should run after this
- Provide a screenshot for a successful rollback after a failed smoke test [SCREENSHOT07]

###### 5. Promotion Phase

Assuming the smoke test came back clean, we should have a relatively high level of confidence that our deployment was a 99% success. Now’s time for the last 1%. UdaPeople uses the “Blue Green Deployment Strategy” which means we deployed a second environment or stack next to our existing production stack. Now that we’re sure everything is a-okay, we can switch from blue to green. 

- Add a build that promotes our new front-end to production
  - Use a CloudFormation template to change the origin bucket to the new S3 bucket arn.
- Provide a screenshot of the successful job. [SCREENSHOT08]

###### 6. Cleanup Phase

The UdaPeople finance department likes it when your AWS bills are more or less the same as last month OR trending downward. But, what if all this “Blue Green” is leaving behind a trail of dead-end production environments? That upward trend probably means no Christmas bonus for the dev team. Let’s make sure everyone at UdaPeople has a Merry Christmas by adding a job to clean up old stacks.

- Add a job that deletes the previous S3 bucket and EC2 instance. 
- Provide a screenshot of the successful job. [SCREENSHOT09]

###### Other Considerations

- Make sure you only run deployment-related jobs on commits to the `master` branch. Provide screenshot of a build triggered by a non-master commit. It should only run the job prior to deployment. [SCREENSHOT10]
- Provide public URLs to deployed application front-end [URL04] and back-end [URL05]

### Turn Errors into Sirens

#### Section 4 - Surface Critical Server Errors for Diagnosis Using Centralized Logging

Errors and unhealthy states are important to know about, wouldn’t you say? But, too often, server errors are silenced by hasty reboots or simply never having an outlet in the first place. If a server has an error in a forest, but no one is there to hear it, did it actually happen? Why is the server in the forest in the first place? 
UdaPeople chose Prometheus as a monitoring solution since it is open-source and versatile. Once configured properly, Prometheus will turn our server’s errors into sirens that no one can ignore.  

##### Setup
- Create an EC2 instance and SSH into it
- Set up Prometheus Server on EC2 following [these instructions](https://devopscube.com/install-configure-prometheus-linux/)
- Configure Prometheus for AWS Service Discovery following [these instructions](https://kbild.ch/blog/2019-02-18-awsprometheus/#_prometheus_aws_service_discovery)

##### To do

###### 1. Setup Back-End Monitoring

In order for server instances to speak to Prometheus, we need to install an “exporter” in each one.  Create a job that uses Ansible to go into the EC2 instance and install the exporter.

- Add a section to your back-end configuration job to install the `node_exporter` for Prometheus monitoring.
- After deploy, ensure your back-end is being discovered by the Prometheus Server.
- Provide a screenshot of a graph of your EC2 instance including available memory, available disk space, and CPU usage. [SCREENSHOT11] 
- Provide a public URL to your Prometheus Server. [URL06]

##### 2. Setup Alerts

Now that Prometheus and our EC2 instance have an open line of communication, we need to set up some alerts. The UdaPeople dev team loves their chat tool and wants to receive an alert in chat when the server starts running out of memory or disk space. Set up a job to make that dream a reality.

- SSH into your Prometheus Server
- Install and configure AlertManager by following [these instructions](https://medium.com/@abhishekbhardwaj510/alertmanager-integration-in-prometheus-197e03bfabdf)
- You can decide if you will use Slack, email or another messaging service.
- Set up an alert for low memory or some condition you can control to intentionally cause an alert.
- Provide a screenshot of an alert that was sent by Prometheus [SCREENSHOT12]

## Project Submission
For your submission, please zip up all of the 12 screenshots, and the text or presentation document, into one zip archive. In your submission you should also include a text file labeled urls.txt with the following URLs:
- Public Url to GitHub repository (not private) [URL01]
- Public Url to working CI/CD pipeline (failure-free) [URL02]
- Public URL for your CloudFront distribution (aka, your front-end) [URL03]
- Public URLs to deployed application front-end [URL04] and back-end [URL05]
- Public URL to your Prometheus Server. [URL06]

Before you submit your project, please check your work against the project rubric. If you haven’t satisfied each criterion in the rubric, then revise your work so that you have met all the requirements. 

## Built With

- [Item1](www.item1.com) - Description of item
- [Item2](www.item2.com) - Description of item
- [Item3](www.item3.com) - Description of item

Include all items used to build project.

## License

[License](LICENSE.md)
