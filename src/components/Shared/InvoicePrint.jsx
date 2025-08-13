

// import React, { forwardRef, useEffect } from "react";

// const InvoicePrint = forwardRef(({ data }, ref) => {
//   const {
//     voucherNo,
//     receiver,
//     address,
//     truckNo,
//     dln,
//     loadingPoint,
//     unloadingPoint,
//     rent,
//     loadingDemurrage,
//     inTime,
//     outTime,
//     totalDay,
//     totalDemurrage,
//     others,
//   } = data;


//   return (
//     <div ref={ref} className="text-sm p-8 bg-white w-[810px] h-[1000px] text-black font-sans mx-auto">
//       <div className="text-center mb-2">
//         <h2 className="text-2xl font-bold text-primary">লাকসাম পরিবহন সংস্থা</h2>
//         <h3 className="font-semibold text-blue-900">LAKSHAM PORIBOHAN SONGSTHA</h3>
//         <div className="text-md font-semibold">
//           Transport Contractor & Commission Agent all over Bangladesh<br />
//           <span className="font-semibold">Dhaka Office:</span> Union Office (4th Floor), Tejgaon, Dhaka-1208<br />
//           <span>📞</span> 01717 314747, 01797 394658, 01615 314747<br />
//           📧 lpsongstha@gmail.com
//         </div>
//         <button className="bg-primary px-3 py-2 rounded-full text-white my-4">Voucher</button>
//       </div>

//       <div className="flex justify-between mb-2 border-b border-black pb-2">
//         <div>
//           <span className="font-semibold">Voucher no:</span> {voucherNo}
//         </div>
//         <div>
//           <span className="font-semibold">Date:</span> __________
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-2 mb-4 space-y-3">
//         <div className="space-y-2">
//           <p><strong className="mr-3">Sender:</strong>Laksham Poribohan Songstha</p>
//           <p><strong className="mr-3">Address:</strong> Union Office (4th Floor), Tejgaon, Dhaka</p>
//         </div>
//         <div className="space-y-2">
//           <p><strong>Receiver:</strong><span className="border-b border-dotted ml-3">{receiver}</span></p>
//           <p><strong>Address:</strong><span className="border-b border-dotted ml-3"> {address}</span></p>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-2 mb-4 border border-primary p-2">
//         <p><strong className="mr-3">Truck no:</strong><span className="border-b border-dotted ml-3"> {truckNo}</span></p>
//         <p><strong className="mr-3">D/L no:</strong> <span className="border-b border-dotted ml-3"> {dln}</span></p>
//       </div>

//       {/* Invoice-like layout with Description & Amount */}
//       <div className="border border-primary mt-5 py-1 space-y-2">
//         <div className="grid grid-cols-2 justify-between border-b border-primary">
//             <p className="text-center font-semibold text-lg">Description</p>
//             <p className="text-center font-semibold text-lg">Amount</p>
//         </div>
//         <div className="p-5 space-y-3">
//           <div className="flex justify-between">
//           <span><strong className="mr-3">Loading Point:</strong><span className="border-b border-dotted ml-3 w-72 inline-block"> {loadingPoint}</span>
//           <span></span>
//           </span>
//         </div>
//         <div className="flex justify-between">
//           <span><strong className="mr-3">Unloading Point:</strong><span className="border-b border-dotted ml-3 w-72 inline-block"> {unloadingPoint}</span>
//           <span></span>
//           </span>
//         </div>
//         <div className="flex justify-between">
//           <span><strong >Rent:</strong></span>
//           <span>{rent}</span>
//         </div>
//         <div className="flex justify-between">
//           <span><strong>Loading Demurrage:</strong></span>
//           <span>{loadingDemurrage}</span>
//         </div>
//         <div className="flex justify-between">
//           <span><strong>In Time:</strong><span className="border-b border-dotted ml-3 w-72 inline-block"> {inTime}</span></span>
//           <span></span>
//         </div>
//         <div className="flex justify-between">
//           <span><strong>Out Time:</strong><span className="border-b border-dotted ml-3 w-72 inline-block"> {outTime}</span></span>
//           <span></span>
//         </div>
//         <div className="flex gap-3">
//           <span><strong>Total Day:</strong></span>
//           <span className="border-b border-dotted ml-3 w-72 inline-block">{totalDay}</span>
//         </div>
//         <div className="flex justify-between">
//           <span><strong>Total Demurrage:</strong></span>
//           <span>{totalDemurrage}</span>
//         </div>
//         <div className="flex pb-20 gap-[30rem]">
//           <span><strong>Others:</strong> {others}</span>
//           <div>
//             <span><strong>Total:</strong> {
//   (parseFloat(rent) || 0) +
//   (parseFloat(loadingDemurrage) || 0) +
//   (parseFloat(totalDemurrage) || 0) +
//   (parseFloat(others) || 0)
// }</span>
//           </div>
//         </div>
//         </div>
//       </div>

//       <p className="mt-4"><strong>In words:</strong> ____________________________</p>

//       <div className="flex justify-between mt-10">
//         <div><p className="text-medium ">Received by</p></div>
//         <div><p className="text-medium text-center">Signature from<br />Laksham Poribohan Songstha</p></div>
//       </div>
//     </div>
//   );
// });

// export default InvoicePrint;


import React, { forwardRef } from "react";

const InvoicePrint = forwardRef(({ data }, ref) => {
  const {
    voucherNo,
    receiver,
    address,
    truckNo,
    dln,
    loadingPoint,
    unloadingPoint,
    rent,
    loadingDemurrage,
    inTime,
    outTime,
    totalDay,
    totalDemurrage,
    others,
  } = data;

  // Function to convert numbers to words
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
    function convertLessThanOneThousand(num) {
      if (num === 0) return '';
      if (num < 10) return ones[num];
      if (num < 20) return teens[num - 10];
      if (num < 100) {
        return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
      }
      return ones[Math.floor(num / 100)] + ' Hundred ' + convertLessThanOneThousand(num % 100);
    }
    
    if (num === 0) return 'Zero';
    let result = '';
    if (num >= 10000000) {
      result += convertLessThanOneThousand(Math.floor(num / 10000000)) + ' Crore ';
      num %= 10000000;
    }
    if (num >= 100000) {
      result += convertLessThanOneThousand(Math.floor(num / 100000)) + ' Lakh ';
      num %= 100000;
    }
    if (num >= 1000) {
      result += convertLessThanOneThousand(Math.floor(num / 1000)) + ' Thousand ';
      num %= 1000;
    }
    result += convertLessThanOneThousand(num);
    return result.trim() + ' Taka Only';
  };

  const totalAmount = (parseFloat(rent) || 0) +
    // (parseFloat(loadingDemurrage) || 0) +
    (parseFloat(totalDemurrage) || 0) +
    (parseFloat(others) || 0);

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div ref={ref} className="text-sm p-8 bg-white w-[810px] h-[1000px] text-black font-sans mx-auto">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-primary">লাকসাম পরিবহন সংস্থা</h2>
        <h3 className="font-semibold text-blue-900">LAKSHAM PORIBOHAN SONGSTHA</h3>
        <div className="text-md font-semibold">
          Transport Contractor & Commission Agent all over Bangladesh<br />
          <span className="font-semibold">Dhaka Office:</span> Union Office (4th Floor), Tejgaon, Dhaka-1208<br />
          <span>📞</span> 01717 314747, 01797 394658, 01615 314747<br />
          📧 lpsongstha@gmail.com
        </div>
        <button className="bg-primary px-3 py-2 rounded-full text-white my-4">Voucher</button>
      </div>

      <div className="flex justify-between mb-2 border-b border-black pb-2">
        <div>
          <span className="font-semibold">Voucher no:</span> {voucherNo}
        </div>
        <div>
          <span className="font-semibold">Date:</span> {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 space-y-3">
        <div className="space-y-2">
          <p><strong className="mr-3">Sender:</strong>Laksham Poribohan Songstha</p>
          <p><strong className="mr-3">Address:</strong> Union Office (4th Floor), Tejgaon, Dhaka</p>
        </div>
        <div className="space-y-2">
          <p><strong>Receiver:</strong><span className="border-b border-dotted ml-3">{receiver}</span></p>
          <p><strong>Address:</strong><span className="border-b border-dotted ml-3"> {address}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 border border-primary p-2">
        <p><strong className="mr-3">Truck no:</strong><span className="border-b border-dotted ml-3"> {truckNo}</span></p>
        <p><strong className="mr-3">D/L no:</strong> <span className="border-b border-dotted ml-3"> {dln}</span></p>
      </div>

      {/* Invoice-like layout with Description & Amount */}
      <div className="border border-primary mt-5">
        <div className="grid grid-cols-2 border-b border-primary">
          <p className="text-center font-semibold text-lg p-2 border-r border-primary">Description</p>
          <p className="text-center font-semibold text-lg p-2">Amount</p>
        </div>
        
        <div className="grid grid-cols-2  border-primary">
          <div className="p-2 border-r border-primary">
            <strong>Loading Point:</strong> <span className="border-b border-dotted ">{loadingPoint}</span>
          </div>
          <div className="p-2"></div>
        </div>
        
        <div className="grid grid-cols-2  border-primary">
          <div className="p-2 border-r border-primary">
            <strong>Unloading Point:</strong> <span className="border-b border-dotted">{unloadingPoint}</span>
          </div>
          <div className="p-2"></div>
        </div>
        
        <div className="grid grid-cols-2  border-primary">
          <div className="p-2 border-r border-primary"><strong>Rent:</strong></div>
          <div className="p-2">{rent}</div>
        </div>
        
        <div className="grid grid-cols-2  border-primary">
          <div className="p-2 border-r border-primary"><strong>Loading Demurrage:</strong></div>
          <div className="p-2">{loadingDemurrage}</div>
        </div>
        
        <div className="grid grid-cols-2  border-primary">
          <div className="p-2 border-r border-primary">
            <strong>In Time:</strong> <span className="border-b border-dotted">{inTime}</span>
          </div>
          <div className="p-2"></div>
        </div>
        
        <div className="grid grid-cols-2 border-primary">
          <div className="p-2 border-r border-primary">
            <strong>Out Time:</strong> <span className="border-b border-dotted">{outTime}</span>
          </div>
          <div className="p-2"></div>
        </div>
        
        <div className="grid grid-cols-2  border-primary">
          <div className="p-2 border-r border-primary">
            <strong>Total Day:</strong> <span className="border-b border-dotted">{totalDay}</span>
          </div>
          <div className="p-2"></div>
        </div>
        
        <div className="grid grid-cols-2  border-primary">
          <div className="p-2 border-r border-primary"><strong>Total Demurrage:</strong></div>
          <div className="p-2">{totalDemurrage}</div>
        </div>
        
        <div className="grid grid-cols-2">
          <div className="p-2 border-r border-primary"><strong>Others:</strong> {others}</div>
          <div className="p-2">
            <strong>Total:</strong> {totalAmount}
          </div>
        </div>
      </div>

      <p className="mt-4"><strong>In words:</strong> {numberToWords(totalAmount)}</p>

      <div className="flex justify-between mt-10">
        <div><p className="text-medium">Received by</p></div>
        <div><p className="text-medium text-center">Signature from<br />Laksham Poribohan Songstha</p></div>
      </div>
    </div>
  );
});

export default InvoicePrint;