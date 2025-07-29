// import { Toaster } from "react-hot-toast";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import YamahaLedger from "./YamahaLedger";
// import HatimLedger from "./HatimLedger";
// import { useEffect, useState } from "react";
// import SuzukiLedger from "./SuzukiLedger";
// import HondaLedger from "./HondaLedger";
// import SelectCustomerLedger from "./SelectCustomerLadger";
// import axios from "axios";

// const CustomerLedger = () => {
//   const [selectedCustomer, setSelectedCustomer] = useState("")
//   const [customers, setCustomers] = useState([])
//   const [loadingCustomers, setLoadingCustomers] = useState(true)
//   const [errorCustomers, setErrorCustomers] = useState(null)
// // customer
// useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}/api/customerLedger/list`)
//       .then((res) => {
//         if (res.data.status === "Success") {
//           setCustomers(res.data.data);
//         }
//         setLoadingCustomers(false);
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         setLoadingCustomers(false);
//       });
//   }, []);

//    const customerNames = [...new Set(customers.map((d) => d.customer_name))];

//   const filteredCustomer = selectedCustomer
//     ? customers.filter((d) => d.customer_name === selectedCustomer)
//     : customers;
    
//   return (
//     <main className="overflow-hidden">
//       <Toaster />
//       <div className="w-xs md:w-full overflow-hidden max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
//             Customer ledger : {selectedCustomer}
//           </h1>
//         </div>

//         {/* Export */}
//         <div className="md:flex items-center justify-between mb-4">
//           <div className="flex gap-1 md:gap-3 flex-wrap"></div>

//           <div className="mt-3 md:mt-0">
//             <div className="relative w-full">
//               <label className="text-primary text-sm font-semibold">
//                 Select Customer Ledger
//               </label>
//              <select
//                 id="customer-select"
//                 value={selectedCustomer}
//                 onChange={(e) => setSelectedCustomer(e.target.value)}
//                 className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
//               >
//                 <option value="">All customer</option>
//                 {loadingCustomers ? (
//                   <option disabled>Loading customers...</option>
//                 ) : errorCustomers ? (
//                   <option disabled>{errorCustomers}</option>
//                 ) : (
//                   // Map through fetched customers to create options
//                   customerNames.map((customer, index) => (
//                     <option key={index} value={customer.customer_name}>
//                       {customer.customer_name}
//                     </option>
//                   ))
//                 )}
//               </select>
//               <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
//             </div>
//           </div>
//         </div>

//         {/*select customer Table */}
//         {/* <div className="w-[1030px] mt-5 overflow-x-auto border border-gray-200">
//           <div>{selectedCustomer === "Yamaha" && <YamahaLedger />}</div>
//           <div>{selectedCustomer === "Hatim Rupgonj" && <HatimLedger />}</div>
//           <div>{selectedCustomer === "Hatim Pubail" && <HondaLedger />}</div>
//           <div>{selectedCustomer === "Suzuki" && <SuzukiLedger />}</div>
//           <div>{selectedCustomer === "Honda" && <HondaLedger />}</div>
//         </div> */}
//         <SelectCustomerLedger  customer={filteredCustomer}/>
//       </div>
//     </main>
//   );
// };

// export default CustomerLedger;


import { Toaster } from "react-hot-toast";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import SelectCustomerLadger from "./SelectCustomerLadger"

import axios from "axios";

const CustomerLedger = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [errorCustomers, setErrorCustomers] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/customerLedger/list`)
      .then((res) => {
        if (res.data.status === "Success") {
          setCustomers(res.data.data);
        }
        setLoadingCustomers(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setErrorCustomers("Failed to fetch customers.");
        setLoadingCustomers(false);
      });
  }, []);

  const customerNames = [...new Set(customers.map((d) => d.customer_name))];
  const filteredCustomer = selectedCustomer
    ? customers.filter((d) => d.customer_name === selectedCustomer)
    : customers;
console.log(customers, 'c')
  return (
    <main className="overflow-hidden">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
            Customer Ledger {selectedCustomer && `: ${selectedCustomer}`}
          </h1>
          <div className="mt-3 md:mt-0 w-full md:w-72">
            <div className="relative w-full">
              <label className="text-primary text-sm font-semibold">
                Select Customer Ledger
              </label>
              <select
                id="customer-select"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">All customer</option>
                {loadingCustomers ? (
                  <option disabled>Loading customers...</option>
                ) : errorCustomers ? (
                  <option disabled>{errorCustomers}</option>
                ) : (
                  customerNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))
                )}
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
        </div>

        <SelectCustomerLadger customer={filteredCustomer} selectedCustomerName={selectedCustomer}/>
      </div>
    </main>
  );
};

export default CustomerLedger;
