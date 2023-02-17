import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

const Tasks = ({ visible, func }) => {
  const [tasks, settasks] = useState([]);
  const [inputTask, setinputTask] = useState("");
  const [updateInput, setupdateInput] = useState("");
  const [updateId, setupdateId] = useState(0);

  const createTask = (e) => {
    e.preventDefault();
    settasks([
      ...tasks,
      {
        id: Math.floor(Math.random() * 100 + 1),
        title: inputTask,
        completed: false,
      },
    ]);
    setinputTask("");
  };

  const deleteTask = (id) => {
    let array = tasks.filter((task) => task.id !== id);
    settasks([...array]);
  };

  const updateTask = (id) => {
    let new_updated_data = tasks.map((taski) => {
      if (taski.id === id) {
        return {
          ...taski,
          title: updateInput,
        };
      }
      return taski;
    });
    settasks([...new_updated_data]);
    setupdateInput("");
    setupdateId(0);
  };

  return (
    <div
      className={`${
        visible
          ? "fixed top-0 left-0 right-0 z-10 bg-gray-800 bg-opacity-80 transition duration-700 ease-in-out w-full p-4 overflow-x-visible inset-0 h-full"
          : ""
      }`}
    >
      <div
        className={`inset-y-0 right-0 bg-blend-multiply p-5 overflow-x-visible overflow-y-auto w-2/4 fixed bg-white  h-full z-50 transition  ${
          visible ? "translate-x-0" : "translate-x-full"
        } duration-700 ease-in-out`}
      >
        <div className="border border-gray-500 rounded-md h-full w-full">
          <div className="font-bold text-xl tracking-widest px-10 py-2">
            Today's Tasks
          </div>
          <div className="space-y-2 py-5 h-3/4 overflow-auto">
            {tasks &&
              tasks.map((task) => (
                <div className="grid place-items-center">
                  <div
                    key={task.id}
                    className={`flex border-2  border-l-4 ${
                      task.completed
                        ? "border-l-gray-500 bg-gray-300"
                        : "border-l-orange-500 bg-orange-200"
                    } rounded-md ${
                      updateId == 0 ? "p-4" : "py-1 px-4"
                    } w-3/4 justify-between border-gray-300`}
                  >
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        let new_updated_data = tasks.map((taski) => {
                          if (taski.id === task.id) {
                            return {
                              ...taski,
                              completed: !taski.completed,
                            };
                          }
                          return taski;
                        });
                        settasks([...new_updated_data]);
                      }}
                    />
                    {!(updateId === task.id) && (
                      <div
                        className={`font-bold ${
                          task.completed ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </div>
                    )}
                    {updateId === task.id && (
                      <div className={`flex`}>
                        <input
                          className="p-2  text-lg focus:outline-0 rounded-l-md border border-orange-500"
                          type="text"
                          value={updateInput}
                          onChange={(e) => setupdateInput(e.target.value)}
                        />
                        <button
                          className="bg-orange-500 font-bold text-white text-sm px-2 py-1 rounded-r-md"
                          onClick={() => updateTask(task.id)}
                        >
                          Update
                        </button>
                      </div>
                    )}
                    <div className="flex gap-3 place-items-center">
                      <button>
                        <MdEdit
                          onClick={() => {
                            setupdateId(task.id);
                            setupdateInput(task.title);
                          }}
                        />
                      </button>
                      <button>
                        <MdDelete onClick={() => deleteTask(task.id)} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {tasks.length===0 && <div className="grid place-items-center space-y-3 my-20">
                <div className="font-bold tracking-widest text-xl">No Tasks are available for today!</div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR4AAACwCAMAAADudvHOAAABWVBMVEX///+q6d7/whz/PQCq6d+l59v/NAD//v+v6uD/OQD/wAD/xBep6t7x/PnU8uyw6uH4/v3D7+a90Nvk7PCjvsudvMzo8fOl7+TejXHymoPvVy32n4v/LAC/x7T8QAjhiW/2l4L4c1r4cFPh9/P6YQ2l6+XT8uzp+fbH8Oiu6NO77uTH3KOZmlcZa5QAWY7/xAD8eAC84bj+SRHW1Yn5wiPkuTOjm1LZszjvyEiY2tZipbUEY5Gz5cnN2Zzb03XX1YFzssGDx8tTmK72sR0lcph4vcTesHPni1H0ySvKrZbrZ0T3VydpYnkzXobg0Wrjl2P4kwP7oxBMfqWs29rhd1yOVV//rQD3jBr89+TYRSrFuqfS58GRVFKuT06iUlnlQxj+02n63pL3wrX3hW+8Szj07c756LO0zNX32M3Unor2kHf5ahK50sHqylV4obbGrD22pE2wn07Nrz48o0uPAAAQsklEQVR4nO1daXvbxhEmpAUJgksCtGwxVRi1DQoQhGzKoihbtg5Hjtwqdqo6R5O2aZvGbpo0rerj/3/oHjgWwGJxECDpCK8fJxYkQLsvZ2ZnZmcWjUaNGjVq1KhRo0aNGjVq1KhRo0aNGjVq1KjxTqG17AGsLmpqhNCNnu0okixLkuLYRnfZ41kldC0N8wIlCohZ6hvLHtWKwHAYajxAKMv96y5DrUarJ8lSAqDsjJY9wuVipCSS4xJ0nSXIFpIjSUACstW4putaV5GjJocDWbmeGmakU0NFiAjQtQLSll6KYrEC1L922mXIIDM9UFL0ZY93sTCyyw4hCFyrFaybjx1M0M/VQHPshq7kZQcZoKz8oN+nd7tdXX9nFbKfYUGPAmSQH8TMyLIV5E5iQBzcrjxHtuIYJH7wr+Q0PL78dFP8wxEObWUYcI8jN6e30gyhJQrKEvvJ64XIwQIkss9dW5NjkS1hdYVj21bDQQs4AHLP++RbDRsW0C0iDFKSIOg9DciAb9HQb5P7KyRBumGMAovsjln28zd6MdUiM1U42tVq6LYGgaKJboQrkz6ysVkMAiVfUnT/+8y4NSnPIgaBEzc/XRtAqChQ6Gai2H81BKhPZy+7+u4ZGhw5kZnpEXYUJbv7jB4bjb90CwANPUFJo1nWVoGfkTd7jX4dsAHpBYuNJoAmaakTYwHlsJYYCkAEZ3kChHAF+Om7kweu+AT0EL+u1dBCwqLkY0cKu4ddR0ZP0IRmh8EKyI8jefTQaTDhgxX5Go0XkZNxaj5AIAQWzhdpmSlG9mdJpARw/LFQekYBHWRwFiM8aFZ5ycFPluhv0nEKn3CTmeLlZ44Cj7gV+RoSa+QEg0Uz0woEX2h5xw8auT4gWtEzG3coL9lBRLaFjtozoba/sNNPPWALW9S8hkdyGek2elkSsbEbobPkxFpLV2Qc6lh0HEwAQehhdA0bnlxej/cciBPQBX3LzHF/dTBs23LNp94PpkF0wtc1raBm4QUaIv+wYFwiLd0663q3OxqNDMOw+mgywJsJxCOzMD2Qv6BnCsXggzt3HuTkBiA2PfMkL3VxH/UVIAeAEjCB6Y7MbriZHmxzkLsSmQLMQg+AD4+OHooDiNg9xydj4NPTWyI7dpBtAYAMaXDaeWRCf2AO/ifSKy1GBfzo6DFiUzxRAOWzyeQsDz0AjjvqYXDHErVrFNt+AGO1o47JVbKoEpHRFBhTLQCPjiapWgMf34EPHsBc9Jjj3U6HkczlaZcRGzaEh7sfHw+w6hBvBa04yA4AgJN6LJBNeTw5Z6cNpEEcTxCDDx6Gr5liruDOb+9+vBP8kLy81MYottwiXn43vHvxjdW38bBals3HF3cewrPQPOHgk6dbETz79AjCJ79/xl57+olIlsDgUl0f/mHAaO0SPeeYdw/B8fNm87MZ/XayT/b5OYQPv2B0Cw6+HLZj+OPR+cPzT0OXmsMvB0HhVIye4927zeZXxwE7ywy8UMAZ+SjNna+Gw6/VP4nv25w8hsr5TSe4GX4wXI9jeufo6OjPkYvDv7iWBThxsfxG/Wx7uvtNcKFvL4YKLkZResCe+vz52m4KPfqdo8cPJzfs4ObBe0008/awGWKi/de//f3bKGfN9wb0Pm5ANeusdTpVTLUQSBzNUmT+Q91Vv0u77eZkMvm8wfjYhJ720xcvQ/x8+892XKSavyT0JNjc72fq7PvSp1kcI0dmLbTS+Nd3GYZ349YPoe1BQs8Q0b3FIYRPDz8av7WZIrkLB6k09T2NHDdG6Wmiax8y9Gwn0SMl07NRypRKRtewNTewyHEXR3owPdvtZgLaIXresSogHJt203Z+WSTQ0375fgJetlOl552AflMM6uknK1fcBcJYb6cr10pCx8hdUZpmexJNczF69J6jkPqIRaLb6zsK3vmXoaLRWCIryqDnB7GYbga/zSAV5wDv6C7KanVtxIufXCHZsBx3L0R6PCqsYAduQQI0irVHwFIW9qSFqzmHco2CXD6Q8tuB/ND73N0D+s1bQtykP8Snp/3s/V8kYFqcHmZHSZL75TLBg4FEBXByC5luFq9cQrenGD3hGqzqt98Ty7hzPKMU0yyWU880hwv4KncKrMSNpxwPWeDCboRsZNXbX4JqyhxPiXvNeln0RE3vaJHSIyrjpj9RyDQPUbC9td6eliE9rUaIo0gJX6UrV0u035njOVF62lsvXq5P16epC7sgoZEEh83cVppBbAnb1nI8KErP+rA53N6ebiVFpO9Psea100wz9pajppkVeAj1KoVH3CGR40Ex0/yj3tiabk+3+RFpm5qldrGYC5lL6oeAig2zI9xpyvGgCD3Nn5BpftGe8rNgPtqFlIs0skIU9cja8uyyR49+Qwz6pCg9L9G1Fwk5wpBpFtOTqDmG7Th21SUtfSE7rvRsiuE+KUxPu/lC//FZyrpV1DQvCmlV7jkeFbU90/XttFV9nWzkwICeFDHdTBlC6UhrCs3xqBg9U7RubfNjriCBOPw3Kz2bG0K4wVXX6Fl233H6fbtnVKpeTjIz89EzxcCmd+tXcfzU/I2PD0gFUR7lMkhjE0Qrl9v6VVnjl57WM0t/bGNzcyMwNeGvOLYHDt4jskPVZ5uD5lrHxe5xUCCTEf6iTgBwbhP2qxCiVmpLMfmxtJWLk9BYRw6PYDX/T2fNxWygFaAnhmqO7LB5KbC49GSCT48GkHKJ2FlvfubRo5661Weu7RFiI5keqYK+r1YodimNHkVD0iPE1BcedY+Kb56VKynBUP6JFGF2OP1ZuemBuFMnhZ7mc5+ew4HE0pMJyfmXkgMMPdxggwtyI7Yox8MoPaTukIaknqGJRVrbMeEpiZ6S+YlEFEq8mDvHwxA9QKOPYOl59uswPmw3v/Ytz6UJS6Wn3LxzhB4Q7z3L8bA+KQhHACF6ph+G8bQ9nXnCc+EXyJdFDyizui6UlMRtEnPaHqBR7RIpVzuwPOqxV1ReHj1l7gqy0qMokNNZleNhiB7FbWMK0RNB21+2ZgE7pdGDK7ZKA0MP1gpOVjXHw3DsD4huCelpfuyKzuE4YKdEekoUnyBexy2d89JDzQj+7+ATXmUqwZB6hGpnP1TRnKf8SUwPLM/6BPQktHTmWChZJwEq7XZCrRxetVR1tj8O18OXJz2wxLYdT3aSurMgyMpPN+SAm//dGnJxd1ddOzjdAyYjO0y+JxPEvYRQNkpLzTuuK5fc9ygr2RCJbSH87wc87O0dS6YZ2s2H8hmAefpoUyKhEjd2bNKfJQl7+2AmZLnLNE1oRnsBIbwzOQfREwBEY05rtSyv5dSQ471rCwYEk6MjRJksZRPTtL46oORZT8RAKzvuz1oMEXxA+OT8I+7ZPcWgaKAs29zCJ9CgD2TOEQGcssvVAsneDM8gPD8rix986klZux4tbHwKT8xDxk7SpLvlCYBPJmDuYWBAHBjB0jaFWvEet/zzg3vHxOyabgdq6hxkiW3oPZs8QH/j4iPL+ceGG12V8rIaLWF5RiaA4wsV+XmHl6cnO3tjnyaQaE5kJ+whb07OHx9NON0TenJVVhI7ZAUukx5rTnYk81B1gyiM2cXV6f4OEiczSZxgLGa8NTma/I87PCufwin0tJsyd1zzH2EZBhj7qT+Kjkp5OrzcP9k7HsOBy5NfFBx3ADe8CqoocpxUhiyyhncBpJIPA0jbCEyj51hd44Ow1EE0PfK0jsoCp1Vfn58eoPkH5uRpI0rFnMYZ7CXRE6JJ7VxcndDMKe8kg4TN88z0AOqfuLpYJj2N+YyzuZNGT6B19ESFOD2JQUBWegDeQQDu4QwlZjQw5hMfcz8rPUiOiHuUI/jMRo8SyeSVXGuYuhcopOeU0tNJoYbQM+ZLz/z0SMGZb2UmNAjmWrzMKzLzV6/vH8xoUYFAvUj2lNKzIW5N2shBD6KGOb+u/DO0ihwxTIGcvwsy89nBq9f3bt++fS+gKc7TBUMP6anD7Rg6F4089OCsQyA9Jebi3VEUZQdHFB4LlJLZwVuXplf3Y9J0xdKTaWCZ6AEKa3vkssucWw2jyFFnlJ2Y2+PSNLv/6g3m6Q2iyTVM6mmMnhQrUeQA2yra3wpb52S3x9UwShPZF1VPQCWmOQxYPjuF1QsC6vbMkMVZSzDM/lV1hxgI1zSLS1XymOYQQCUtBEXVy3V7Zp5hfusaZp48ueUYlJ6uuMhysyA9VRXJ24WyUcB3ewgns4P7r994hnktapmp21OtcpVagsBCK5Tvdd2eqGE+oIb53hu6ztPvzSAjPRXRU1lfsp6RnXCIZl4kW2ZEiOsO3SeXDulvIPRkc2wL2J6K2MkWe+GdeJZGKNFanWSPmblM3R53w0+vwPbk2S3LjwyvTdJwJQdLj+v2BIaZLlQ80+y6PZAq12YlK5dWZWtXam4XSpFDmj23x7M4gcccX+bVfVqwUp3tKbX2iQPh8gVpdBO+Fs72xD3mg5kvSepO1fTAqhv+xZlVHBpHPq+TBKc5FIC9piU9xO1Rys/3BPRU3u8v5CdeyWE+UgM6klhao+ZbJd0TCvCkJ5hLbFb5InYPCzhsRE/mB+fkoofJum7P25DHnJDxUanb456au3FLlO65VcA0L+IsDUF0ikVHixgn89AXEuIK3nZjdB5PM5OlJxNy0VN6nocPrvwAReGUkAEwC6bvtSC5hvleNAC7St7ISUIOeqCU55yzecDrTcaiE78MxzzL3PECMC8zRtMZl24hagX0AFj1ms6iHxuVonDfRuLtAYo8ZqR1lJ796uip3OMJw5LZCjdcXCdx39nheoUz4goexGP0kGU+CdGzIT6X40YOesDCT0kPxReKJiW8isQ88aQnGqPHaVL3TCYkzYaM0lNpqMXFKPS6l4RXUkDf7Qk0LNiyeBtOIKrescsePa2oJY1b1oz0yIs7fc4fmUbzhxourUvaZzYvOaaZ2bIg4vTqgF4eR+jJMogM9ABZWcYRAfhkFhDdn43Sc8i3MyxNs/uUnhmshp6lHQA+UmTxG5AAnAnoieDQazApkR4IFrtkRWBBWfQKJBgtfRLAd3tKpUe2l/nek5ZuSSAaSDCjSyx94tDzqFx6SBmYg63OMk8yxgTJSa/8SS99Yug5KZceKEN7+ae2oNVX70kJozSTsj08evye4yL5HmZ5wB8VkOVFn7UrgtHnvpIXZK4MY+gB+enRWJcdIHtol1zCMzf0nhOvwgbjWWZ+VM/tyZPxpJsnit+MB5GiO73l6xQPuuWQl1IxYmTuXc3cyso0ejrBW6Qyb/O23FUBn86AhEaGjrX897sJoBvkRGdfeiRgwvHe3smjy0OXpkR6vNMgyFkgvQCW1ePAwtdtV6E1oCHJtXsrTY2Hbq+v4HYHXMmNJQn9Hxd2Q3i8d7J/eXWxxqVJvWLajqHMa4YLQ0Z/AO1kUWxrtPx3tuZA17AdLOysHQL4VXCYp+O9nf3Tq8NOSJzU/ZRXTUVBDnZSHNsgzKyYJc6CrmE5CjlV3n0HUEiasNbtnJwirSM8HY6F7PiHReP3r+Nz6p2+ZRAT/A4Sw0AfGZbtYG0DvjL44kSlaYy0biel4Qu63UuSg09L675TqpQBehfThF9S4E/Ua4HDhgTENQt6PV3o3xoixTJ+fqzE0dIxUwZaeOx+33EctznWb1bGX5MT9WwLEWKMuteAEwatd91a1KhRo0aNGjVq1KhRo0aNGjVq1KhRo0aNGjVKwf8BotwB0zeT9qAAAAAASUVORK5CYII=" alt="todoimg" />
                <div className="text-gray-500 font-bold">Start creating new tasks.</div>
              </div>}
          </div>

          <div className="grid place-items-center h-32">
            <div className="w-full grid place-items-center">
              <form className="flex w-3/4" onSubmit={createTask}>
                <input
                  value={inputTask}
                  onChange={(e) => setinputTask(e.target.value)}
                  className="border-2 text-lg font-semibold border-green-800 w-full px-4 py-2 rounded-l-lg focus:outline-0"
                  type="text"
                />
                <button className="p-2  text-sm bg-green-800 text-white rounded-r-lg">
                  Create Task
                </button>
              </form>
            </div>
          </div>
        </div>
        <button
          className="absolute left-0 top-2/4 py-2 px-0.5 bg-gray-200"
          onClick={() => func(false)}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Tasks;
