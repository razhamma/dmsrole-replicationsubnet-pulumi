const aws = require("@pulumi/aws");

function createdmsvpcrole() {
    const dmsVPCRole = new aws.iam.Role("dms-vpc-role", {
        name: "dms-vpc-role",
        assumeRolePolicy: `{
          "Version": "2012-10-17",
          "Statement": [
              {

              "Principal": {
                      "Service": "dms.amazonaws.com"
                  },
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow"
              }
          ]
}`,
    });
    return dmsVPCRole;
}

function createdmscwlogsrole() {
    const dmsCWLogsRole = new aws.iam.Role("dms-cloudwatch-logs-role", {
        name: "dms-cloudwatch-logs-role",
        assumeRolePolicy: `{
          "Version": "2012-10-17",
          "Statement": [
              {

              "Principal": {
                      "Service": "dms.amazonaws.com"
                  },
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow"
              }
          ]
}`,
    });
    return dmsCWLogsRole;
}

function createdmsaccessforendpointrole() {
    const dmsRedshiftRole = new aws.iam.Role("redshift-access-for-dms-endpoint-role", {
        name: "redshift-access-for-dms-endpoint-role",
        assumeRolePolicy: `{
          "Version": "2012-10-17",
          "Statement": [
          {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
            "Service": "dms.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
          },
          {
            "Sid": "2",
            "Effect": "Allow",
            "Principal": {
            "Service": "redshift.amazonaws.com"
            },
           "Action": "sts:AssumeRole"
          }
        ]
      }`,
    });
    return dmsRedshiftRole;
}


function attach_policy_dms_vpc_role() {
    const dmsvpcrole = createdmsvpcrole();
    const dmsVPCManagementRolePolicy = new aws.iam.RolePolicyAttachment("dms-vpc-role-policy", {
        policyArn: "arn:aws:iam::aws:policy/service-role/AmazonDMSVPCManagementRole",
        role: dmsvpcrole
    });
    return dmsVPCManagementRolePolicy;
}

function attach_policy_dms_cwlogs_role() {
    const dmscwlogsrole = createdmscwlogsrole();
    const dmsCloudWatchLogsRole = new aws.iam.RolePolicyAttachment("dms-cloudwatch-logs-role-policy", {
        policyArn: "arn:aws:iam::aws:policy/service-role/AmazonDMSCloudWatchLogsRole",
        role: dmscwlogsrole
    });
    return dmsCloudWatchLogsRole;
}

function attach_policy_dms_endpoint_access() {
    const dmsendpointaccessrole = createdmsaccessforendpointrole();
    const dmsRedshiftEndpointAccessRole = new aws.iam.RolePolicyAttachment("redshift-access-for-dms-endpoint-policy", {
        policyArn: "arn:aws:iam::aws:policy/service-role/AmazonDMSRedshiftS3Role",
        role: dmsendpointaccessrole
    });
    return dmsRedshiftEndpointAccessRole;
}

function create_replication_subnet_group() {
    const dms_vpc_role_with_policy = attach_policy_dms_vpc_role();
    const dms_cwlogs_role_policy = attach_policy_dms_cwlogs_role();
    const dms_redshift_endpoint_access_role_policy = attach_policy_dms_endpoint_access();
    const dmsReplicationSubnetGroup = new aws.dms.ReplicationSubnetGroup("dms", {
        replicationSubnetGroupDescription: "Test replication subnet group",
        replicationSubnetGroupId: "dms-replication-subnet-group",
        subnetIds: [###YOUR OWN AWS ACCOUNT VPC SUBNETS###],
    }, {
        dependsOn: [dms_vpc_role_with_policy, dms_cwlogs_role_policy, dms_redshift_endpoint_access_role_policy]
    });
    return dmsReplicationSubnetGroup;
}

create_replication_subnet_group();
