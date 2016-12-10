#!/bin/sh

if [ $1 == ".c" ]
	then
		cmd="g++ $3/hello.c"
		eval "$cmd"
		if [ $2 == 'y' ]
			then
				cmd="./a.out < $3/input.txt"
				eval "$cmd"
		else
			cmd="./a.out"
				eval "$cmd"
		fi
elif [ $1 == ".cpp" ]
	then
		cmd="g++ $3/hello.cpp"
		eval "$cmd"
		if [ $2 == 'y' ]
			then
				cmd="./a.out < $3/input.txt"
				eval "$cmd"
		else
			cmd="./a.out"
				eval "$cmd"
		fi
elif [ $1 == ".py" ]
	then
		if [ $2 == 'y' ]
			then 
				cmd="python $3/hello.py < $3/input.txt"
				eval "$cmd"
		else
			cmd="python $3/hello.py"
			eval "$cmd"
		fi
elif [ $1 == ".rb" ] 
	then
		if [ $2 == 'y' ]
			then
				cmd="ruby $3/hello.rb < $3/input.txt"
				eval "$cmd"
		else
			cmd="ruby $3/hello.rb"
			eval "$cmd"
		fi	
elif [ $1 == ".java" ]
	 then
	 	cmd="javac $3/HelloWorld.java"
	 	eval "$cmd"
	 	if [ $2 == "y" ]
	 		then
	 			cmd="java $3/HelloWorld < $3/input.txt"
	 			eval "$cmd"
	 	else
	 		cmd="java $3/HelloWorld"
	 		eval "$cmd"
	 	fi
fi
