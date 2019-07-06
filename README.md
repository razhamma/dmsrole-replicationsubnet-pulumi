# dmsrole-replicationsubnet-pulumi

Pulumi:
=======
The Pulumi Platform includes an open source SDK and freemium SaaS to help developers, DevOps, and IT teams alike create, deploy, and manage cloud apps and infrastructure, across any clouds, with one consistent workflow.

The goal of this tutorial is to provision a pulumi stack with defined resources on the AWS Cloud. This pulumi stack will be launched with following resources:
  1. dms-vpc-role(resource name) - aws:iam:Role(Pulumi aws specific resource type) 
  2. dms-vpc-policy-attachment(resource name) - aws::iam:RolePolicyAttachment(Pulumi aws specific resource type)
  3. ReplicationSubnetGroup(resource name) - aws:dms:replicationSubnetGroup(Pulumi aws specific resource type)

Usecase:
=========
When performing a database migration using AWS DMS service, subnet replication group is required to be defined for enabling DMS to perform migrations from source to a specific VPC. Additionally, if you use the AWS CLI or the AWS DMS API for your database migration, you must add three IAM roles to your AWS account before you can use the features of AWS DMS. Two of these are dms-vpc-role and dms-cloudwatch-logs-role. If you use Amazon Redshift as a target database, you must also add the IAM role dms-access-for-endpoint to your AWS account.

Requirements:
=============
Setting up Pulumi will require:
1. Installing Pulumi - To install Pulumi for AWS please follow guidelines here: https://www.pulumi.com/docs/quickstart/aws/install-pulumi/
2. Installing node/npm(Make sure to choose version 8 or later)- https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
3. Install awscli - https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
4. configure it with the user(must have necessary permissions to make IAM/DMS API calls) - https://www.pulumi.com/docs/reference/clouds/aws/setup/

Proceeding to creation of our Pulumi Stack:
===========================================
1. Through terminal: create a new directory named "dmsPulumi"  
   > mkdir dmsPulumi
2. Go to this newly created directory:
   > cd dmsPulumi
3. Create a new Pulumi project. If this is your first time running pulumi new (or most other pulumi commands), you will be prompted to login to the Pulumi service. 
   > pulumi new aws-javascript 
4. Pulumi will start project's creation and you will be asked to provide following details on terminal:
   a- project name: (pulum-test-final)
   b- project description: (A minimal AWS JavaScript Pulumi program)
   c- stack name: (dev) stack-final-test
   d- aws:region: The AWS region to deploy into: (us-east-1)
5. After successful creation of project and dependencies installations, you will see the message as: "Your new project is ready to go!"
6. Successful project creation will create the following directory sturcture within "dmsPulumi" directory
   |-project name
     |-node_modules
       |-...
       |-...
       ....
     |-.gitignore
     |-index.js - Actual Code with API calls specifications from "@pulumi/aws" module
     |-package.json
     |-package-lock.json
     |-Pulumi.your_stack_name.yaml - Stack Settings file -> https://www.pulumi.com/docs/reference/project/#stack-settings-file
     |-Pulumi.yaml - Project file -> https://www.pulumi.com/docs/reference/project/#pulumi-yaml
7. Edit the "index.js" file and replace the sample code with code from "dms_iam_replicationgroup.js" file from this repo.
8. Back to trminal and staying in "dmsPulumi" directory, run:
   pulumi up
9. This will create your Pulumi stack and command will return with a URL. Browsing to this URL will give you the visual representation of your Plumi stack including activity history and resources.
   
