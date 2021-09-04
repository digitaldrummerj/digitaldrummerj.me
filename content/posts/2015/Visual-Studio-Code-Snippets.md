---
categories:
- productivity
- visual studio
date: 2015-08-18T00:00:00Z
excerpt: |
  There are a bunch of built-in Visual Studio code snippets that will generate code for you with a short keyword and then a tab key press.  These shortcuts will make you more efficient when writing code such as creating properties, loops, exceptions, etc.

  Below I have listed the code snippets  that I most frequently use and what the output from them looks like.
published: true
series: ["developer-productivity"]
title: Visual Studio Code Snippets

---

There are a bunch of built-in Visual Studio code snippets that will generate code for you with a short keyword and then a tab key press.  These shortcuts will make you more efficient when writing code such as creating properties, loops, exceptions, etc.

Below I have listed the code snippets  that I most frequently use and what the output from them looks like.  

To use these snippets type they keyword and then press the tab key. 

## Loops

* do

		do
		{
		} while (b);
	
* while

		while (true)
		{
		}
	
* for

		for (int i = 0; i < UPPER; i++)
		{
		}
	
* foreach

		foreach (var VARIABLE in COLLECTION)
		{
		}
	
## Conditionals

* if

		if (b)
		{
		}
	
* else

		else
		{
		}
	
* switch

		switch (@enum)
		{
		}

## Error Trapping

* try

		try
		{
		}
		catch (Exception)
		{
			throw;
		}
		
* tryf

		try
		{
		}
		finally
		{
		}
	
* exception

		[Serializable]
		public class MyException : Exception
		{
			//
			// For guidelines regarding the creation of new exception types, see
			// http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpgenref/html/cpconerrorraisinghandlingguidelines.asp
			// and
			// http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncscol/html/csharp07192001.asp
			public MyException()
			{
			}

			public MyException(string message) : base(message)
			{
			}

			public MyException(string message, Exception inner) : base(message, inner)
			{
			}

			protected MyException(
				SerializationInfo info,
				StreamingContext context) : base(info, context)
			{
			}
		}
		
## Properties

* prop

		public TYPE Type { get; set; }
	
* propfull

		private int myVar;

		public int MyProperty
		{
			get { return myVar; }
			set { myVar = value; }
		}
	
* propg

		public int I { get; private set; }

## Misc

* ctor
	
		public class Misc
		{
			public Misc()
			{	
			}
		}
	
* enum

		enum MyEnum
		{
		}
	
* struct

		struct MyStruct
		{
		}
	
* &num;region

		#region MyRegion
		#endregion


There are several more code snippets that are available at [http://tinyurl.com/vscodesnippets](http://tinyurl.com/vscodesnippets).  

With these few code snippets you will be amazed at how much less code you end up writing by hand.  Ever little bit helps to make you more productive and efficient as a developer.  

Let me know what you favorite snippets are or ones that you have created.

