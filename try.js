      var todos = [];
      var newMarked;
      var alreadyMarked = [];
      var marked = [];
      var moved = [];
      var checks = [];
      var removed;
      var leftItem;
      var clearFill;
      var newTodo;
      var errMessage;



      // this is to clear the input fill for todo
      function clear()
      {
          clearFill = document.getElementById("todo").value = "";
      }



      // This is to add a todo task
      function addTodo()
      {
          newTodo = document.getElementById("todo").value;
           if((newTodo!==null ) && (newTodo!==" ") && (newTodo!==""))
           {
              todos.push(newTodo);
              moveTodo();
              listTodo();
              enterAnotherTodo();
              leftItems();
              clear();

          }else 
          {
            errorMessage();
          }
      }



      //This is to reset the fill of a todo task
      function enterAnotherTodo()
      {
            document.getElementById("todo").value = "Enter another todo here!";
     }



      // This is to list all the todo task
      function listTodo()
      {

          if((todos === null || todos === "" ) && (marked === null || marked === ""))
        {
              errorMessage();
          }  else if((todos === null || todos === "" ) && (marked != null || marked != ""))
        {
          leftItems();
        }else
        {
          let ul = document.getElementById("sortable");
          let lis = '';
          for(let i = 0; i < todos.length; i++)
           {
              var li = '<li class="ui-state-default" >\
                              <div class="checkbox">\
                                  <label>\
                                      <input type="checkbox" value="' + todos[i] + '" id="" />\
                                      <div id="list1">' + todos[i] + '</div>\
                                  </label>\
                              </div>\
                        </li>';
              lis += li;
          }

          ul.innerHTML = (typeof lis !== "undefined") ? lis : '';


          checks = document.getElementById("sortable").querySelectorAll("input[type=checkbox]");
          
            for(let p = 0; p < checks.length; p++)
          {
              checks[p].onchange = function()
              {   
                newMarked = this.getAttribute("value");

                if(alreadyMarked.length == 0)
                {
                  alreadyMarked.push(newMarked);
                  todos.splice(todos.indexOf(newMarked),1);

                } else if(alreadyMarked.indexOf(newMarked)!== -1)
                {
                    window.alert(" This Item has already been checked, unchecking it means that you are not moving it to Already Done!");
                    todos.push(newMarked);
                    alreadyMarked.splice(alreadyMarked.indexOf(newMarked),1);
                } else
                {
                  alreadyMarked.push(newMarked);
                  todos.splice(todos.indexOf(newMarked),1);
                }
                
              }
            
          }


          listTodo1();
          leftItems();
      }
    }



      // This is to display the number of todo task entered
      function leftItems()
      {
          leftItem = todos.length;
          if (leftItem == 0 || leftItem == null )
        {
              document.getElementById("leftItem").innerHTML= "There is no Todo task item entered yet or all have been moved to Already Done!";
          }  else
        {
              document.getElementById("leftItem").innerHTML = "Items or item left yet to move to already done --- " + leftItem ;
          }
      }


      // This is to alert when all todo tasks have been pushed to already done section
      function listTodo1()
      {
          if ( todos == null || todos == "")
          {
              alert("All todo entered have been moved to already done or you've not entered a Todo yet!");
          }
    }


      // This is to move marked todo tasks to already done section
      function moveTodo()
      {
          let ul = document.getElementById("done-items");
           let lis = '';
          for(let k = 0; k < alreadyMarked.length; k++)
          {
              var li = '<li class="ui-state-default" >\
                              <div class="checkbox">\
                                  <label>\
                                      <input type="checkbox" value="' + alreadyMarked[k] + '" id="list1" />\
                                      <div id="list1">' + alreadyMarked[k] + '</div>\
                                  </label>\
                              </div>\
                        </li>';
              lis += li;
          }
           
          
          ul.innerHTML = (typeof lis !== "undefined") ? lis : '';
           moved = document.getElementById("done-items").querySelectorAll("input[type=checkbox]");
          
             for(let r = 0; r < moved.length; r++)
           {
               moved[r].onchange = function()
               {
                   removed = this.getAttribute("value");
                  alreadyMarked.splice(alreadyMarked.indexOf(removed),1);
                  moveTodo();
               }
           }

        listTodo();

      }



      // This is to quit application and request for a restart
      function todoDone()
      {
          alert ("You are done with your Todo task, application restarts!");
          location.reload();
      }


      // This is to alert an error when a todo task has not been entered or an empty todo is entered
      function errorMessage()
      {
          errMessage = prompt("You have not entered any todo task, do you want to quit the app?");
          if( errMessage == "yes" || errMessage == "yeah"){
              todoDone();
          }  else
        {
              alert(" You can now enter a todo task if you do not want to quit, or you may click the 'Todo Done' botton to quit.");
          }
      }
