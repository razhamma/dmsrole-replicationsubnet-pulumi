const aws = require("@pulumi/aws");

function createdmsrole() {
    const dmsRole = new aws.iam.Role("dms-vpc-role", {
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
    return dmsRole;
}

function attach_policy() {
    const roled = createdmsrole();
    const dmsVPCManagementRolePolicy = new aws.iam.RolePolicyAttachment("dms-vpc-role-policy", {
    policyArn: "arn:aws:iam::aws:policy/service-role/AmazonDMSVPCManagementRole",
    role: roled
});
    return dmsVPCManagementRolePolicy;
}

function create_replication_subnet_group(){
    const role_with_policy = attach_policy();
    const dmsSubnetGroup = new aws.dms.ReplicationSubnetGroup("dms", {
    replicationSubnetGroupDescription: "Test replication subnet group",
    replicationSubnetGroupId: "test-dms-replication-subnet-group",
    subnetIds: [],
}, {
    dependsOn: role_with_policy
});
    return dmsSubnetGroup;
}

create_replication_subnet_group();