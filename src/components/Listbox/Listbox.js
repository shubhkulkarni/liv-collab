import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function List({ list = {}, selected, setSelected }) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 p-2 mx-2 bg-white rounded-2xl">
        <Listbox.Button
          className="relative bg-purple-100 hover:bg-purple-200 w-full py-2 pl-3 pr-10 text-left  text-sm rounded-lg text-purple-900 font-medium focus:outline-none
         focus-visible:ring-4 cursor-pointer focus-visible:ring-opacity-75 focus-visible:ring-purple-500 focus-visible:ring-offset-white focus-visible:ring-offset-2 focus-visible:border-indigo-500 "
        >
          <span className="block truncate">{selected.name}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute  z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-purple-500 ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `${
                    active
                      ? "text-amber-900 bg-amber-100 font-bold"
                      : "text-gray-900"
                  }
                          hover:bg-purple-100 cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
                value={person}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? "text-amber-600" : "text-amber-600"
                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                      ></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
