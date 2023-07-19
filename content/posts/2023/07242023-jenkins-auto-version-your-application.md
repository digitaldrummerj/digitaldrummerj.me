---
categories: ["jenkins"]
date: 2023-07-24T13:00:00Z
published: true
title: "Jenkins - Automatically Versioning Your Application"
url: '/jenkins-automatically-versioning-your-application'
---

In a previous post, I showed how to use GitVersion with Jenkins but unfortunately as I got further into my Jenkins usage, I was not able to get GitVersion to consistently work across pull request, tags and main branch.  Several times I thought I had it working only to find out as I fixed it for one of the places I needed to use it that I broke it for the other places.  It felt like I was spending more time trying to get GitVersion working then I did on getting the whole build working.  So it was time for a different solution.

GitVersion is what we were using to determine the version number to use for our nuget packages and releases.  It made it so that we did not have to remember each sprint to increment our version number which we routinely forgot to do until we started packaging a release and then it just delayed us as the build needed to run with the new version number.

The replacement tool we decide on was jx-release-version.  jx-release-version just worked out of the box the first time in all of my scenarios (pull request, tags, and main branch).

Below we will go through the code I needed to add to my Jenkinsfile to get jx-release-version to give me the version number to use.

<!--more-->

**Note:** I am on Windows and have not tested it on a linux Jenkins agent.

The first thing that I needed to do was download and unzip the Windows install of jx-release-version from [https://github.com/jenkins-x-plugins/jx-release-version/releases](https://github.com/jenkins-x-plugins/jx-release-version/releases).

Once the zip downloaded, I unzipped jx-release-version to c:\jx-release-version on my Jenkins controller.

The next thing I needed to do was to add a stage to my Jenkinsfile to use jx-release-version to get the version number and make it an environment variable that I can use in future stages.

In the script below, we are checking if the Jenkins environment variable TAG_NAME is set and if it is then we are tell jx-release-version to use the tag as the version number.  For our Git tags, they are in the format of v1.0.0 and jx-release-version will strip out the starting v.  If the build is not from a tag then we increment the minor version by default and it will pick up the version from the latest tag we created.  Once we get the version number f rom jx-release-version, we set the versionNumber environment variable by calling `env.versionNumber`

**NOTE:** I am using my Jenkinsfile in a Multi-Branch build so the TAG_NAME might not be set if you are not using a Multi-Branch build.

```groovy
stage ('Set Version Number') {
    steps {
        script {
            def isTag = env.TAG_NAME != null
            if (isTag) {
                def tagVersionOutput = bat returnStdout: true, script: "@\\jx-release-version\\jx-release-version -next-version=manual:${env.TAG_NAME}"

                env.versionNumber = "${tagVersionOutput.trim()}"
            } else {
                def output = bat returnStdout: true, script: '@\\jx-release-version\\jx-release-version -next-version=increment:minor'

                def versionNumber = output.trim()

                env.versionNumber = "${versionNumber}-ci${env.BUILD_NUMBER}"
            }

            echo "versionNumber: ${env.versionNumber}"
        }
    }
}
```

Now  that we have the versionNumber environment variable, we can use it in any of the other stages in the Jenkinsfile.  For Windows, we can use it in a bat file using `%versionNumber%`

```groovy
stage('Build') {
    steps {
        bat '''
        echo %versionNumber%
        '''
    }
}
```

And just like that we have semantic versioning working in our Jenkins build.
