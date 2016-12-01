#!/bin/sh

if [ $1 == ".c" ]
	then
		cmd="g++ hello.c"
		eval "$cmd"
		if [ $2 == 'y' ]
			then
				cmd="./a.out < input.txt"
				eval "$cmd"
		else
			cmd="./a.out"
				eval "$cmd"
		fi
elif [ $1 == ".cpp" ]
	then
		cmd="g++ hello.cpp"
		eval "$cmd"
		if [ $2 == 'y' ]
			then
				cmd="./a.out < input.txt"
				eval "$cmd"
		else
			cmd="./a.out"
				eval "$cmd"
		fi
elif [ $1 == ".py" ]
	then
		if [ $2 == 'y' ]
			then 
				cmd="python hello.py < input.txt"
				eval "$cmd"
		else
			cmd="python hello.py"
			eval "$cmd"
		fi
elif [ $1 == ".rb" ] 
	then
		if [ $2 == 'y' ]
			then
				cmd="ruby hello.rb < input.txt"
				eval "$cmd"
		else
			cmd="ruby hello.rb"
			eval "$cmd"
		fi	
elif [ $1 == ".java" ]
	 then
	 	cmd="javac HelloWorld.java"
	 	eval "$cmd"
	 	if [ $2 == "y" ]
	 		then
	 			cmd="java HelloWorld < input.txt"
	 			eval "$cmd"
	 	else
	 		cmd="java HelloWorld"
	 		eval "$cmd"
	 	fi
fi
