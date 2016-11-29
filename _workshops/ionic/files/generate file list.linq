<Query Kind="Statements" />

string dir = @"C:\personal\digitaldrummerj.github.io\_site\workshops\ionic";
string fileType = "*.html";

var files = Directory.GetFiles(dir, fileType, SearchOption.AllDirectories);

foreach (string file in files.OrderBy (f => f))
{
	file.Dump();
}
