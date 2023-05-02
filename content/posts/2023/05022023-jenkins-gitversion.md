---
categories: ["jenkins"]
date: 2023-05-02T13:00:00Z
published: true
title: "Using GitVersion on Jenkins"
url: '/jenkins-gitversion'
---

For my continuous integration builds I use Gitversion to determine that SemVer to use for a particular build and release.  For pre-release builds the version would look like something like 0.1.5-ci0004 where the -ci is appended to the version number and the 4 is the build number in the CI system.  Then for a release  release version, it would just be the version number of 0.1.5 without the -ci or build number at the end.

I am in the process of moving several builds to Jenkins and needed to get Gitversion working on Jenkins.  I am totally new to Jenkins so even though Gitversion has [documentation](https://gitversion.net/docs/reference/build-servers/jenkins) on how to set up Jenkins correctly it took me a bit to figure out where those options were. My initial attempts ended up with the pre-release being 0.1.5-origin-master-0004 instead of 0.1.5-ci0004.

Below are the options that you need to add into Jenkins and what they are called.

1. For Branches to build, make the branch specifier

    ```text
    +refs/heads/*:refs/remotes/@{remote}/*

    ```

    ![Branches to Build Branch Specifier](/images/gitversion-jenkins/git-branches.png)

1. Add Clean before checkout and check Delete untracked nested repositories

    ![Git Before Checkout](/images/gitversion-jenkins/git-clean-before-checkout.png)

1. Add Advanced clone behaviors and then check both Fetch tags and Honor refspec on initial clone.  Leave Path of the r eference repo to use during clone and Timeout fields empty and do not check Shallow clone

    ![Git Advanced Clone Behaviors](/images/gitversion-jenkins/git-advanced-clone-behaviors.png)

1. Add Prune stale remote-tracking branches

    ![Git Prune Remote Tracking Branch](/images/gitversion-jenkins/git-prune-remote-tracking.png)

1. Add Check out to specific local branch and leave the branch name empty

    ![Git Check out to specific local branch](/images/gitversion-jenkins/git-checkout-specific-local-branch.png)

Now that your Git checkout is setup correctly, before you can run gitversion you need to add the EnvInject plugin so that you can put the gitversion information onto environment variables that you can use in other build steps.

1. Click on Manage Jenkins
1. Click on Manage Plugins
1. In the avaiable plugins list search for EnvInject
1. Install the plugin

Now you are ready to add the build steps to execute your Gitversion command and then inject them into your environment variables.

1. For the build steps, add an Execute Windows batch command and set the command text to:

    ```shell
    gitversion /output buildserver
    ```

    As part of the output you will see Gitversion output such as

    ```text
    GitVersion_Major=0
    GitVersion_Minor=1
    GitVersion_Patch=5
    GitVersion_PreReleaseTag=ci.4
    GitVersion_PreReleaseTagWithDash=-ci.4
    GitVersion_PreReleaseLabel=ci
    GitVersion_PreReleaseLabelWithDash=-ci
    GitVersion_PreReleaseNumber=4
    GitVersion_WeightedPreReleaseNumber=55004
    GitVersion_BuildMetaData=
    GitVersion_BuildMetaDataPadded=
    GitVersion_FullBuildMetaData=Branch.master.Sha.440219f44061cd2a8d1d8b21ad2dcd1580f5ecd3
    GitVersion_MajorMinorPatch=0.1.5
    GitVersion_SemVer=0.1.5-ci.4
    GitVersion_LegacySemVer=0.1.5-ci4
    GitVersion_LegacySemVerPadded=0.1.5-ci0004
    GitVersion_AssemblySemVer=0.1.5.0
    GitVersion_AssemblySemFileVer=0.1.5.0
    GitVersion_FullSemVer=0.1.5-ci.4
    GitVersion_InformationalVersion=0.1.5-ci.4+Branch.master.Sha.440219f44061cd2a8d1d8b21ad2dcd1580f5ecd3
    GitVersion_BranchName=master
    GitVersion_EscapedBranchName=master
    GitVersion_Sha=440219f44061cd2a8d1d8b21ad2dcd1580f5ecd3
    GitVersion_ShortSha=440219f
    GitVersion_NuGetVersionV2=0.1.5-ci0004
    GitVersion_NuGetVersion=0.1.5-ci0004
    GitVersion_NuGetPreReleaseTagV2=ci0004
    GitVersion_NuGetPreReleaseTag=ci0004
    GitVersion_VersionSourceSha=cc7a999cb8118c8c098a8f45f507403342a64435
    GitVersion_CommitsSinceVersionSource=4
    GitVersion_CommitsSinceVersionSourcePadded=0004
    GitVersion_UncommittedChanges=0
    GitVersion_CommitDate=2022-02-09
    ```


1. After the build step for gitversion, add an Inject environment variables step and set the Properties File Path to:

    ```text
    gitversion.properties

    ```

1. Now you can use the Gitversion references into other build steps such as a nuget package build where it will use the environment variable %GitVersion_NuGetVersionV2%.

    ```shell
    dotnet pack MyNugetPackage.sln /p:PackageVersion=%GitVersion_NuGetVersionV2% --version-suffix "pr%BUILD_NUMBER%" -c Release
    ```

    You will see in the log output that the command execute was:

    ```text
    dotnet pack MyNugetPackage.sln /p:PackageVersion=0.1.5-ci0004 --version-suffix "pr10" -c Release
    ```
