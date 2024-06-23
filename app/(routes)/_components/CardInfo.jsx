import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState();
  const [totalSpend, setTotalSpend] = useState();

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((e) => {
      totalBudget_ = totalBudget_ + Number(e.amount);
      totalSpend_ = totalSpend_ + e.totalSpend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  useEffect(() => {
    budgetList && CalculateCardInfo();
  }, [budgetList]);

  return (
    <div>
      {budgetList.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">${totalBudget}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 text-white rounded-full" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">${totalSpend}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 text-white rounded-full" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. Of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList.length}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 text-white rounded-full" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((e, i) => (
            <div className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
