import { Toaster } from "react-hot-toast";
import { MdOutlineArrowDropDown } from "react-icons/md";
import YamahaLedger from "./YamahaLedger";
import HatimLedger from "./HatimLedger";
import { useState } from "react";
import SuzukiLedger from "./SuzukiLedger";
import HondaLedger from "./HondaLedger";

const CustomerLedger = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("Yamaha");
  return (
    <main className=" md:p-2 overflow-hidden">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
            Customer ledger : {selectedCustomer}
          </h1>
        </div>

        {/* Export */}
        <div className="md:flex items-center justify-between mb-4">
          <div className="flex gap-1 md:gap-3 flex-wrap"></div>

          <div className="mt-3 md:mt-0">
            <div className="relative w-full">
              <label className="text-primary text-sm font-semibold">
                Select Customer Ledger
              </label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">Select customer</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Hatim Rupgonj">Hatim Rupgonj</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Honda">Honda</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-[1030px] mt-5 overflow-x-auto border border-gray-200">
          <div>{selectedCustomer === "Yamaha" && <YamahaLedger />}</div>
          <div>{selectedCustomer === "Hatim Rupgonj" && <HatimLedger />}</div>
          <div>{selectedCustomer === "Hatim Pubail" && <HondaLedger />}</div>
          <div>{selectedCustomer === "Suzuki" && <SuzukiLedger />}</div>
          <div>{selectedCustomer === "Honda" && <HondaLedger />}</div>
        </div>
      </div>
    </main>
  );
};

export default CustomerLedger;
