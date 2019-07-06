# dmsrole-replicationsubnet-pulumi

Pulumi:
=======
The Pulumi Platform includes an open source SDK and freemium SaaS to help developers, DevOps, and IT teams alike create, deploy, and manage cloud apps and infrastructure, across any clouds, with one consistent workflow.

The goal of this tutorial is to provision a pulumi stack with defined resources on the AWS Cloud. This pulumi stack will be launched with following resources:
  1. dms-vpc-role(resource name) - aws:iam:Role(Pulumi aws specific resource type) 
  2. dms-vpc-policy-attachment(resource name) - aws::iam:RolePolicyAttachment(Pulumi aws specific resource type)
  3. dms-cloudwatch-logs-role(resource name) - aws:iam:Role(Pulumi aws specific resource type) 
  4. dms-cloudwatch-logs-role-policy(resource name) - aws::iam:RolePolicyAttachment(Pulumi aws specific resource type)
  5. redshift-access-for-dms-endpoint-role(resource name) - aws:iam:Role(Pulumi aws specific resource type) 
  6. redshift-access-for-dms-endpoint-policy(resource name) - aws::iam:RolePolicyAttachment(Pulumi aws specific resource type)
  7. ReplicationSubnetGroup(resource name) - aws:dms:replicationSubnetGroup(Pulumi aws specific resource type)

Usecase:
=========
When performing a database migrations to AWS cloud using AWS DMS service, subnet replication group is required to be defined for enabling DMS to perform migrations from source to a specific VPC. Additionally, if you use the AWS CLI or the AWS DMS API for your database migration, you must add three IAM roles to your AWS account before you can use the features of AWS DMS. Two of these are dms-vpc-role and dms-cloudwatch-logs-role. If you use Amazon Redshift as a target database, you must also add the IAM role dms-access-for-endpoint to your AWS account. In case you are using not using Cloudfromation but some other orchestrator in order to meet the application requirements and to have full control over the way you need application to interact with AWS, due to a some buggy logic in the code or non-sequential js execution behavior, IAM eventual consistency can be a big problem and you might end up adding waits or unnecessary behaviors inside your code to override this problem. This tutorial includes the Nodejs code and step-by-step instructions on using Pulumi to successfully set up a DMS replication group along with all the necessary roles as well as required policy attachments without encountring IAM eventual consistency.

Requirements:
=============
Setting up Pulumi will require:
1. Installing Pulumi - To install Pulumi for AWS please follow guidelines here: https://www.pulumi.com/docs/quickstart/aws/install-pulumi/
2. Installing node/npm(Make sure to choose version 8 or later)- https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
3. Installing awscli - https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
4. configuring awscli with the user(must have necessary permissions to make IAM/DMS API calls) - https://www.pulumi.com/docs/reference/clouds/aws/setup/

Proceeding with creation of our Pulumi Stack:
=============================================
1. Through terminal create a new directory named ```dmsPulumi```  
   ```mkdir dmsPulumi```
2. Enter into this newly created directory  
   ```cd dmsPulumi```
3. Create a new Pulumi project. If this is your first time running pulumi new (or most other pulumi commands), you will be prompted to login to the Pulumi service  
   ```pulumi new aws-javascript``` 
4. Pulumi will start project's creation and you will be asked to provide following details on terminal:
   - project name: pulumi-iamdmssubnet-proj
   - project description: (A minimal AWS JavaScript Pulumi program)
   - stack name: iamdms-stack
   - aws:region: The AWS region to deploy into: (us-east-1)
5. After successful creation of project and dependencies installations, you will see the message as  
   ```"Your new project is ready to go!"```
6. Successful project creation will create the following directory sturcture within "dmsPulumi" directory

   ```bash
   ├── pulumi-iamdmssubnet-proj  <--- Project name from Step 4
   │   ├── node_modules
   │   │   ├── ....
   │   │   │── ....
   │   ├── index.js - Actual Code with API calls specifications from "@pulumi/aws" module
   │   ├── package.json
   │   ├── package-lock.json
   │   ├── Pulumi.iamdms-stcak.yaml - Stack Settings file -> (https://www.pulumi.com/docs/reference/project/#stack-settings-file)
   │   └── Pulumi.yaml - Project file -> (https://www.pulumi.com/docs/reference/project/#pulumi-yaml)
   └── ....
   ```
7. Edit the ```index.js``` file from ```pulumi-iamdmssubnet-proj``` directory and replace the sample code with code from "dms_iam_replicationgroup.js" file from this repo.  
   **Please make sure to include subnet ids for the subnets from your VPC, in the "subnetIds:[]" input list inside the code.** 
8. Back to trminal and staying in "dmsPulumi" directory, run:
   pulumi up
9. This will create your Pulumi stack and command will return with a URL. Browsing to this URL will give you the visual representation of your Pulumi stack including activity history and resources belonging to this Pulumi stack.

Clean Up:
=========
1. From directory ```dmsPulumi```, running the following command will delete all the stack resources but not the stack itself.
   ```pulumi destroy```
2. To delete the stack itself, run the following command:  
   ```pulumi stack rm```
   
References:
===========
[1] Creating the IAM Roles to Use With AWS DMS - (https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Security.APIRole.html)  
[2] Pulumi - (https://www.pulumi.com)

