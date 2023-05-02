---
categories: ["dotnet"]
date: 2023-05-01T13:00:00Z
published: true
title: "Use C# to Convert PNG to Base64"
url: '/csharp-png-to-base64'
---

For something I was working on I created a quick script to convert all PNG files in a directory to a base64 representation of the image.  Since I was going to need to do this multiple times as we iterated over the image designs to get one that we were happy with, I decided to write a quick script using C# and use [Linqpad](https://www.linqpad.net/) to run the script.  

For the script output, I needed to output the following TypeScript object for the project that I needed the base64 values for.

```typescript
const images = {
  "LG1": "base64 of image. removed for readability here",
  "LG10": "base64 of images. removed for readability here",
  ...add a row for each image
}
```

Here is the [Linqpad](https://www.linqpad.net/) script that I wrote.  

```csharp
string directoryPath = @"Directory with the PNG iamges";

string[] pngFiles = Directory.GetFiles(directoryPath, "*.png");

StringBuilder sb = new StringBuilder("const images = {\n");
foreach (string pngFile in pngFiles)
{
 byte[] imageBytes = File.ReadAllBytes(pngFile);
 string base64String = Convert.ToBase64String(imageBytes);
 string filename = Path.GetFileNameWithoutExtension(pngFile);
 filename = filename.Replace("-", "").Replace(" ", "").Replace("_", "");
 sb.AppendFormat("\t\"{0}\": \"{1}\",\n", filename, base64String);
}

sb.Remove(sb.Length - 2, 2); // Remove the trailing comma and newline
sb.Append("\n}"); // add newline before the closing bracket

// Print out the output string
sb.ToString().Dump();
```

Now that I have the TypeScript object in the Linqpad output window I can just copy and paste it into my TypeScript code.
