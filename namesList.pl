#!/usr/bin/perl
# namesList.pl < NamesList.txt > RelatedChars.txt
use strict;

my $char;

print "#Related Characters extracted from NamesList.txt\n";

while (<>) {
	$char = $1 if (m/^([0-9A-F]+)\s/);
	print "$char;$1\n" if (m/^\s+x \(.*?([0-9A-F]+)\)/);
}