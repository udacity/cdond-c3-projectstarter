## Section 3 - Utilize a Configuration Management Tool to Accomplish Deployment to Cloud-Based Servers

In this section, you will practice creating and configuring infrastructure before deploying code to it. You will accomplish this by preparing your AWS and CircleCI accounts just a bit, then by building Ansible Playbooks for use in your CircleCI configuration.

### Setup

#### AWS
1. Create and download a new key pair in AWS for CircleCI to use to work with AWS resources. Name this key pair "udacity" so that it works with your Cloud Formation templates. [This tutorial may help](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair) (look for "Option 1: Create a key pair using Amazon EC2"). You'll be using this key pair (pem file) in future steps so keep it in a memorable location. 
2. Create IAM user for programmatic access only and copy the id and access keys. [This tutorial may help.](https://serverless-stack.com/chapters/create-an-iam-user.html) You'll need these keys if you want to try any AWS commands from your own command line. You'll also need these credentials to add to CircleCI configuration in the next steps.
3. Add a PostgreSQL database in RDS that has **public accessibility**. Take note of the connection details (hostname, username, password). [This tutorial may help.](https://aws.amazon.com/getting-started/tutorials/create-connect-postgresql-db/) As long as you marked "Public Accessibility" as "yes", you won't need to worry about VPC settings or security groups.

Please watch the [video walkthrough of preparing AWS here](https://www.youtube.com/watch?v=d1W1HUz8yRw).

### CloudFront Distribution Primer

At the very end of the pipeline, you will need to make a switch from the old infrastructure to the new as you learned about with the Blue Green Deployment strategy. We will use CloudFormation and CloudFront to accomplish this. However, for this to work, you must do a few things manually:

1) Create a random string (e.g. `kk1j287dhjppmz437`) for use in next steps.
2) Create an S3 Bucket with a name that combines "udapeople" and the random string (e.g. "udapeople-kk1j287dhjppmz437"). If S3 complains that the name is already taken, just choose another random string. The random string is to distinguish your bucket from other student buckets.
3) Run our provided [Cloud Formation](https://github.com/udacity/cdond-c3-projectstarter/blob/master/.circleci/files/cloudfront.yml) template locally (for the Workflow ID parameter, use your random string).

Once that is done, subsequent executions of that template will modify the same CloudFront distribution to make the blue-to-green switch without fail.

#### Circle CI

Please watch the [video walkthrough of setting up your secrets here](https://www.youtube.com/watch?v=caFJQ1YwVdU).

1. Add SSH Key pair from EC2 as shown [here](https://circleci.com/docs/2.0/add-ssh-key/). To get the actual key pair, you'll need to open the pem file in a text editor and copy the contents. Then you can paste them into Circle CI.

2. Add the following environment variables to your Circle CI project by navigating to {project name} > Settings > Environment Variables as shown [here](https://circleci.com/docs/2.0/settings/):
  - `AWS_ACCESS_KEY_ID`=(from IAM user with programmatic access)
  - `AWS_SECRET_ACCESS_KEY`= (from IAM user with programmatic access)
  - `AWS_DEFAULT_REGION`=(your default region in aws)
  - `TYPEORM_CONNECTION`=`postgres`
  - `TYPEORM_MIGRATIONS_DIR`=`./src/migrations`
  - `TYPEORM_ENTITIES`=`./src/modules/domain/**/*.entity.ts`
  - `TYPEORM_MIGRATIONS`=`./src/migrations/*.ts`
  - `TYPEORM_HOST`={your postgres database hostname in RDS}
  - `TYPEORM_PORT`=`5532` (or the port from RDS if it’s different)
  - `TYPEORM_USERNAME`={your postgres database username in RDS}
  - `TYPEORM_PASSWORD`={your postgres database password in RDS}
  - `TYPEORM_DATABASE`={your postgres database name in RDS}

_NOTE:_ Some AWS-related jobs may take awhile to complete. If a job takes too long, it could cause a timeout. If this is the case, just restart the job and keep your fingers crossed for faster network traffic. If this happens often, you might consider increasing the job timeout [as described here](https://support.circleci.com/hc/en-us/articles/360007188574-Build-has-hit-timeout-limit).

### To Do

#### 1. Infrastructure Phase

Setting up servers and infrastructure is complicated business. There are many, many moving parts and points of failure. The opportunity for failure is massive when all that infrastructure is handled manually by human beings. Let’s face it. We’re pretty horrible at consistency. That’s why UdaPeople adopted the IaC (“Infrastructure as Code”) philosophy after “Developer Dave” got back from the last DevOps conference. We’ll need a job that executes some CloudFormation templates so that the UdaPeople team never has to worry about a missed deployment checklist item.

In this phase, you will add CircleCI jobs that execute Cloud Formation templates that create infrastructure as well as jobs that execute Ansible Playbooks to configure that newly created infrastructure.

##### Create/Deploy Infrastructure

- Find the job named `deploy-infrastructure` in your config file
  - Add code to create your infrastructure using [CloudFormation templates](https://github.com/udacity/cdond-c3-projectstarter/tree/master/.circleci/files). Again, provide a screenshot demonstrating an appropriate job failure (failing for the right reasons). **[SCREENSHOT05]**

![Job properly failing because of an error when creating infrastructure.](screenshots/SCREENSHOT05.png)

  - Select a Docker image that supports the AWS CLI
  - Create backend infrastructure by editing the step named `Ensure back-end infrastructure exists`. You'll notice you need to edit the `--tags`, `--stack-name`, and `--parameter-overrides` with your information. Make sure to remove each `#` to uncomment the lines after you've added your information.
    - Use the workflow id to mark your CloudFormation stacks so that you can reference them later on (ex: rollback). If you'd like, you can use the parameterized CloudFormation templates we provided. 
    - Programmatically create a new EC2 Instance for your back-end.
    - Make sure the EC2 instance has your back-end port opened up to public traffic (default port 3030).
    - Programmatically save the new back-end url to memory or disk for later use (the front-end needs it). This could be done with [MemStash.io](https://memstash.io).
    - Tag the back-end infrastructure so that it can be referenced later.
  - Create frontend by editing the step named `Ensure front-end infrastructure exist`. Again, add your information and remove the `#` to uncomment the appropriate lines.
    - Use a CloudFormation template to create a new S3 Bucket for your front-end.
    - Use the workflow id to mark the front-end infrastructure so that you can reference it easily later on.
    - Tag the front-end infrastructure so that it can be referenced later.
  - Generate an inventory file for use with Ansible by using AWS CLI to append the newly created backend IP to the [provided](https://github.com/udacity/cdond-c3-projectstarter/blob/master/.circleci/ansible/inventory.txt) inventory file.
    - Persist the modified inventory file to the workspace so that we can use that file in future jobs.
  
##### Configure Infrastructure

- Find the job named `configure-infrastructure` in the config file.
  - Write code to set up the EC2 intance to run as our back-end.
    - Select a Docker image that supports Ansible.
    - Add the SSH key fingerprint to job so that Ansible will have access to the EC2 instance via SSH.
    - Attach the "workspace" to the job so that you have access to all the files you need (e.g. inventory file).
    - Create an Ansible playbook named `configure-server.yml` in the `.circleci/ansible` folder to set up the backend server. Remember that you are running this Playbook against an EC2 instance that has been programmatically created (inside the CircleCI job). 
      - Use username `ubuntu`.  
      - Keep your playbook clean and maintainable by using roles. You will need to decide what roles to create and how to split up your code.
      - Install Python, if needed.
      - Update/upgrade packages.
      - Install nodejs.
      - Install pm2.
      - Configure environment variables (use the `environment` module type in your role):
        - `ENVIRONMENT`=`production`
        - `TYPEORM_CONNECTION`=`postgres`
        - `TYPEORM_ENTITIES`=`./modules/domain/**/*.entity{.ts,.js}`
        - `TYPEORM_HOST`={your postgres database hostname in RDS}
        - `TYPEORM_PORT`=`5532` (or the port from RDS if it’s different)
        - `TYPEORM_USERNAME`={your postgres database username in RDS}
        - `TYPEORM_PASSWORD`={your postgres database password in RDS}
        - `TYPEORM_DATABASE`={your postgres database name in RDS}
      - Install and [Configure PM2](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps) to run back-end server.

- Provide a URL to your public GitHub repository. **[URL01]**

#### 2. Deploy Phase

Now that the infrastructure is up and running, it’s time to configure for dependencies and move our application files over. UdaPeople used to have this ops guy in the other building to make the copy every Friday, but now they want to make a full deploy on every single commit. Luckily for UdaPeople, you’re about to add a job that handles this automatically using Ansible. The ops guy will finally have enough time to catch up on his Netflix playlist.

##### Database migrations

- Find the job named `run-migrations` in the config file.
  - Select a Docker image that's compatible with NodeJS.
  - Write code that runs database migrations so that new changes are applied. 
    - Save some evidence that any new migrations ran. This is useful information if you need to roll back. Hint: The migration output will include `"has been executed successfully"` if any new migrations were applied.
      - Save the output to a file or variable.
      - Use `grep` to check for text that shows that a new migration was applied.
      - If true, send a "1" (or any value at all) to [MemStash.io](https://memstash.io) using a key that is bound to the workflow id like `migration_${CIRCLE_WORKFLOW_ID}`.

##### Deploy Front-end

- Find the job named `deploy-frontend` in the config file.
  - Select a Docker image that can handle the AWS CLI.
  - Write code to prepare the front-end code for distribution and deploy it. 
    - Install any additional dependencies
    - Add the url of the newly created back-end server to the `API_URL` environment variable. This is important to be done before building the front-end in the next step because the build process will take the `API_URL` from the environment and "bake it" (hard-code it) into the front-end code.
      - In a previous job, you created the back-end infrastructure and saved the IP address of the new EC2 instance. This is the IP address you will want to pull out and use here. If the IP address is "1.2.3.4", then the `API_URL` should be `https://1.2.3.4:3000`.
    - Run `npm run build` one last time so that the back-end url gets "baked" into the front-end. 
    - Copy the files to your new S3 Bucket using AWS CLI (compiled front-end files can be found in a folder called `./dist`).
- Provide the public URL for your S3 Bucket (aka, your front-end). **[URL02]**

##### Deploy Back-end

- Find the job named `deploy-backend` in the config file.
  - Select a Docker image that is compatible with Ansible.
  - Create code to deploy the compiled backend files to the EC2 instance. 
    - Add the SSH key fingerprint to the job.
    - Attach the "workspace" so that you have access to the previously generated `inventory.txt`.
    - Install any necessary dependencies.
    - Use Ansible to copy the files (compiled back-end files can be found in a folder called `./dist`).

#### 3. Smoke Test Phase

All this automated deployment stuff is great, but what if there’s something we didn’t plan for that made it through to production? What if the UdaPeople website is now down due to a runtime bug that our unit tests didn’t catch? Users won’t be able to access their data! This same situation can happen with manual deployments, too. In a manual deployment situation, what’s the first thing you do after you finish deploying? You do a “smoke test” by going to the site and making sure you can still log in or navigate around. You might do a quick `curl` on the backend to make sure it is responding. In an automated scenario, you can do the same thing through code. Let’s add a job to provide the UdaPeople team with a little sanity check.

- Find the job named `smoke-test` in your config file.
  - Select a lightweight Docker image like one of the Alpine images.
  - Write code to make a simple test on both front-end and back-end. Use the suggested tests below or come up with your own. 
    - Install dependencies like `curl`.
    - Test the back-end
      - Retrieve the back-end IP address that you saved in an earlier job.
      - Use `curl` to hit the back-end API's status endpoint (e.g. https://1.2.3.4:3000/api/status)
      - No errors mean a successful test
    - Test the front-end
      - Form the front-end url using the workflow id and your AWS region like this: `URL="http://udapeople-${CIRCLE_WORKFLOW_ID}.s3-website-us-east-1.amazonaws.com"` 
      - Check the front-end to make sure it includes a word or two that proves it is working properly.
      - No errors mean a successful test
      ```bash
      if curl -s ${URL} | grep "Welcome"
      then
        return 1
      else
        return 0
      fi
      ```
    
- Provide a screenshot for appropriate failure for the smoke test job. **[SCREENSHOT06]**

![Job properly failing because of a failed smoke test.](screenshots/SCREENSHOT06.png)

#### 4. Rollback Phase

Of course, we all hope every pipeline follows the “happy path.” But any experienced UdaPeople developer knows that it’s not always the case. If the smoke test fails, what should we do? The smart thing would be to hit CTRL-Z and undo all our changes. But is it really that easy? It will be once you build the next job!

- At the top of your config file, create a “[command](https://circleci.com/docs/2.0/reusing-config/#authoring-reusable-commands)” named `destroy-environment` to remove infrastructure if something goes wrong
  - Trigger rollback jobs if the smoke tests or any following jobs fail. 
  - Delete files uploaded to S3.
  - Destroy the current CloudFormation stacks using the same stack names you used when creating the stack earlier (front-end and back-end).
- At the top of your config file, create a “[command](https://circleci.com/docs/2.0/reusing-config/#authoring-reusable-commands)” named `revert-migrations` to roll back any migrations that were successfully applied during this CI/CD workflow
  - Trigger rollback jobs if the smoke tests or any following jobs fail. 
  - Revert the last migration (IF a new migration was applied) on the database to that it goes back to the way it was before. You can use that value you saved in [MemStash.io](https://memstash.io) to know if you should revert any migrations.
- No more jobs should run after these commands have executed.
- Provide a screenshot for a successful rollback after a failed smoke test. **[SCREENSHOT07]**

![Successful rollback job.](screenshots/SCREENSHOT07.png)

- Add these rollback commands to other jobs that might fail and need a rollback.

#### 5. Promotion Phase

Assuming the smoke test came back clean, we should have a relatively high level of confidence that our deployment was a 99% success. Now’s time for the last 1%. UdaPeople uses the “Blue-Green Deployment Strategy” which means we deployed a second environment or stack next to our existing production stack. Now that we’re sure everything is "A-okay", we can switch from blue to green. 

- Find the job named `cloudfront-update` in your config file.
  - Select a docker image that is compatible with AWS CLI.
  - Create code that promotes our new front-end to production.
    - Install any needed dependencies
    - Use a [CloudFormation template](https://github.com/udacity/cdond-c3-projectstarter/tree/master/.circleci/files) to change the origin of your CloudFront distribution to the new S3 bucket.
- Provide a screenshot of the successful job. **[SCREENSHOT08]**

![Successful promotion job.](screenshots/SCREENSHOT08.png)

- Provide the public URL for your CloudFront distribution (aka, your production front-end). **[URL03]**
- Provide the public URL for your back-end server in EC2. **[URL04]**

#### 6. Cleanup Phase

The UdaPeople finance department likes it when your AWS bills are more or less the same as last month OR trending downward. But, what if all this “Blue-Green” is leaving behind a trail of dead-end production environments? That upward trend probably means no Christmas bonus for the dev team. Let’s make sure everyone at UdaPeople has a Merry Christmas by adding a job to clean up old stacks.

- Find the job named `cleanup` in your config file.
  - Write code that deletes the previous S3 bucket and EC2 instance. 
    - Query CloudFormation to find out the old stack's workflow id like this:
    ```
    export OldWorkflowID=$(aws cloudformation \
          list-exports --query "Exports[?Name==\`WorkflowID\`].Value" \
          --no-paginate --output text)
      export STACKS=($(aws cloudformation list-stacks --query "StackSummaries[*].StackName" \
          --stack-status-filter CREATE_COMPLETE --no-paginate --output text)) 
    ```
    - Remove old stacks/files
      - Back-end stack (example: `aws cloudformation delete-stack --stack-name "udapeople-backend-${OldWorkflowID}"`)
      - Front-end files in S3 (example: `aws s3 rm "s3://udapeople-${OldWorkflowID}" --recursive`)
      - Front-end stack
- Provide a screenshot of the successful job. **[SCREENSHOT09]**

![Successful cleanup job.](screenshots/SCREENSHOT09.png)

#### Other Considerations

- Make sure you only run deployment-related jobs on commits to the `master` branch. Provide screenshot of a build triggered by a non-master commit. It should only run the jobs prior to deployment. **[SCREENSHOT10]**

![Deploy jobs only run on master](screenshots/SCREENSHOT10.png)
