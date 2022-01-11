// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld 
{
  string private message;

  constructor() 
  {
    message = "Hello World!! How are you?";
  }

  function SaySomething(string memory _message) public {
    message = _message;
  }

  function Get() public view
  returns (string memory _message)
   {
     return message;
  }
}
