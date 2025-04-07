import React from 'react';

const GetAccredited = () => {
  return (
    <div>

      {/* Section 1: What is Accreditation */}
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between px-8 md:px-20 py-20 bg-white ">
        {/* Left Section - Heading */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-black">
            What is <br /> Accreditation
          </h1>
        </div>

        {/* Right Section - Text */}
        <div className="md:w-1/2 text-gray-700 md:text-xl text-lg space-y-6">
          <p>
            Accreditation is a process wherein independent or non-governmental agencies give
            acknowledgement to education providers or programs that meet specifically designed criteria.
          </p>
          <p>
            The primary purposes of accreditation are to ensure that an institution, course or qualification
            conform to general expectations and to assist educational institutions to continually improve
            the quality of their courses and qualifications.
          </p>
        </div>
      </div>

      {/* Section 2: Online Accreditation Title */}
      <div className="flex flex-col items-center justify-center px-8 md:px-20 py-20 bg-[#7C2B33] text-white">
        <h1 className="text-4xl md:text-7xl font-bold text-center">Online Accreditation</h1>
        <p className="mt-4 md:text-xl text-lg text-center max-w-3xl">
          Please complete and submit the form. Our team will contact you as soon as possible.
        </p>
      </div>

      {/* Section 3: Form */}
      <div className="bg-[#7C2B33] py-1 px-8 md:px-20">
        <div className="bg-white max-w-5xl mx-auto p-10 rounded-xl shadow-md">
          <form className="space-y-6 text-gray-900">
            <p className="text-sm text-red-600 font-medium">
              Fields marked with an <span className="text-red-600">*</span> are required
            </p>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Name of Organisation / Institute <span className="text-red-600">*</span>
              </label>
              <input type="text" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Address Line 1 <span className="text-red-600">*</span>
              </label>
              <input type="text" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Address Line 2 <span className="text-red-600">*</span>
              </label>
              <input type="text" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Province / City / State <span className="text-red-600">*</span>
              </label>
              <input type="text" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Country <span className="text-red-600">*</span>
              </label>
              <select className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required>
                <option value="">Select a country</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Sri Lanka</option>
                <option>Australia</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Year of Inception <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                maxLength={4}
                className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]"
                required
              />
              <p className="text-sm text-gray-500 mt-1">4 of 4 Character(s) left</p>
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Website <span className="text-red-600">*</span>
              </label>
              <input type="url" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Please provide a brief profile of your institution <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Name of Head / Authorized Signatory <span className="text-red-600">*</span>
              </label>
              <input type="text" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">Phone <span className="text-red-600">*</span></label>
              <input type="tel" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">Email <span className="text-red-600">*</span></label>
              <input type="email" className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]" required />
            </div>

            <div>
              <label className="block font-semibold mb-2 md:text-xl">
                Is your institution having any local or international accreditations? <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center md:text-xl">
                  <input type="radio" name="accreditationStatus" value="yes" required />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center md:text-xl">
                  <input type="radio" name="accreditationStatus" value="no" required />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 md:text-xl">If yes, please share details</label>
              <textarea rows={4} className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]"></textarea>
            </div>

            <div className="text-left pt-4">
              <button
                type="submit"
                className="bg-[#7C2B33] text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-[#74323B] transition duration-200 md:text-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default GetAccredited;
