import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Switcher({ enabled, setEnabled, label }) {
  return (
    <Switch.Group>
      <div className="flex items-center ">
        <Switch.Label className="mx-1 md:mx-4 font-semibold">
          {label}
        </Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-indigo-500" : "bg-indigo-200"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white opacity-70 rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}
