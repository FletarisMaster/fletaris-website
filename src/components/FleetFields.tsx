'use client';

import { useState } from 'react';
import { FLEET_VERTICALS, sizesFor, type Vertical } from '@/lib/fleet-options';

// The "What do you manage?" + "Fleet size" pair of the shared signup form. With a fixed
// `vertical` (/air) only the fleet size shows, in that vertical's unit. Without one (the hub)
// the visitor picks a vertical first and the fleet-size options switch to match.
// The binder (src/lib/waitlist.ts) reads #vertical / #fleetsize from the DOM and attaches its
// listeners to these elements, so they must stay mounted (no `key` remounts).

export default function FleetFields({
  vertical: fixed,
  labelClass,
  fieldClass,
}: {
  vertical?: Vertical;
  labelClass: string;
  fieldClass: string;
}) {
  const [vertical, setVertical] = useState<Vertical | ''>(fixed ?? '');
  const [size, setSize] = useState('');
  const sizes = sizesFor(vertical);
  const select = `${fieldClass} appearance-none disabled:bg-surface-band disabled:text-text-secondary disabled:cursor-not-allowed`;

  return (
    <>
      {!fixed && (
        <div id="group-vertical" className="mt-4">
          <label htmlFor="vertical" className={labelClass}>
            What do you manage? <span aria-hidden="true">*</span>
          </label>
          <select
            id="vertical"
            required
            value={vertical}
            onChange={(e) => {
              setVertical(e.target.value as Vertical);
              setSize(''); // sizes differ per vertical
            }}
            aria-describedby="vertical-error"
            className={select}
          >
            <option value="" disabled>
              Select one
            </option>
            {FLEET_VERTICALS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
          <p id="vertical-error" data-field-error="" hidden className="mt-2 font-body text-[14px] text-[#991B1B]">
            Choose what you manage.
          </p>
        </div>
      )}

      <div id="group-fleetsize" className="mt-4">
        <label htmlFor="fleetsize" className={labelClass}>
          Fleet size <span aria-hidden="true">*</span>
        </label>
        <select
          id="fleetsize"
          required
          disabled={!vertical}
          value={size}
          onChange={(e) => setSize(e.target.value)}
          aria-describedby="fleetsize-error"
          className={select}
        >
          <option value="" disabled>
            {vertical ? 'Select fleet size' : 'Choose what you manage first'}
          </option>
          {sizes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <p id="fleetsize-error" data-field-error="" hidden className="mt-2 font-body text-[14px] text-[#991B1B]">
          Choose your fleet size.
        </p>
      </div>
    </>
  );
}
