import Container from "@/components/container";
import React from "react";

export const metadata = {
  title: "YPP Training & Meetings",
  description: "Search for YPP Training and Meetings in your community",
};
const AboutPage: React.FC = () => {
  return (
    <Container>
      <div className="w-full px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <iframe
      src="https://calendar.google.com/calendar/embed?height=1000&wkst=1&ctz=America%2FNew_York&title=YPP%20North%20East%20Training%20Center&src=Y185ZWYyMjM5OWFiOWZiM2I0YmU3MjFhODVhNjFkNjUxN2JiZjAyNDIzNGI1ZjA3ZmFkOTE0YjkyMDcxNGIxMWRjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23f6bf26"
      width="100%"
      height="800"
      className="w-full rounded-xl border"
      style={{ border: 0 }}
      frameBorder="0"
      scrolling="no"
    ></iframe>
  


              {/* //TRAINING NEXT FORM-----
              <form action="#" method="POST" className="mt-16">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Phone (optional)
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        aria-describedby="phone-description"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      School / Organization
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      State
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-sm/6">
                      <label
                        htmlFor="message"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Tell us a little about your goals for this Flagway
                        season
                      </label>
                      <p id="message-description" className="text-gray-400">
                        Max 250 words
                      </p>
                    </div>
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        aria-describedby="message-description"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <fieldset className="sm:col-span-2">
                    <legend className="block text-sm/6 font-semibold text-gray-900">
                      How many people will be at the training?
                    </legend>
                    <div className="mt-4 space-y-4 text-sm/6 text-gray-600">
                      <div className="flex gap-x-2.5">
                        <input
                          defaultValue="under_25k"
                          id="budget-under-25k"
                          name="budget"
                          type="radio"
                          className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label htmlFor="budget-under-25k">Less than 10</label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          defaultValue="25k-50k"
                          id="budget-25k-50k"
                          name="budget"
                          type="radio"
                          className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label htmlFor="budget-25k-50k">
                          Between 10 and 20
                        </label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          defaultValue="50k-100k"
                          id="budget-50k-100k"
                          name="budget"
                          type="radio"
                          className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label htmlFor="budget-50k-100k">
                          Between 20 and 30
                        </label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          defaultValue="over_100k"
                          id="budget-over-100k"
                          name="budget"
                          type="radio"
                          className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label htmlFor="budget-over-100k">More than 30</label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="start-date"
                    className=" pt-8 block text-sm/6 font-semibold text-gray-900"
                  >
                    Training Start Date
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="start-date"
                      name="start-date"
                      type="date"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 mt-4">
                  <label
                    htmlFor="end-date"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Training End Date
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="end-date"
                      name="end-date"
                      type="date"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                  </div>
                </div>

                <div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Send request
                  </button>
                </div>
              </form>
               */}
            </div>
          </div>
        
      
    </Container>
  );
};

export default AboutPage;
