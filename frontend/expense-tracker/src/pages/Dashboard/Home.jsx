import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

import InfoCard from "../../components/Cards/InfoCardComponent";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { addThousandsSeprator } from "../../utils/helper";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";


const Home = () => {

  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

 const fetchDashboardData = async () => {
  try {

    const response = await axiosInstance.get(
      API_PATHS.DASHBOARD.GET_DATA
    );

    console.log("API DATA:", response.data);
console.log("LAST 60 DAYS:", response.data.last60DaysIncome);
console.log("TRANSACTIONS:", response.data.last60DaysIncome.transactions);

    if (response.data) {
      setDashboardData(response.data);
    }

  } catch (error) {
    console.log("Dashboard error:", error);
  }
};

  useEffect(() => {

    console.log("Home component loaded");

    fetchDashboardData();

  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">

      <div className="my-5 mx-auto">

        {/* INFO CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeprator(dashboardData?.totalBalance || 0)}
            color="bg-purple-500"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeprator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeprator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />

        </div>

        {/* RECENT TRANSACTIONS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

         <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
          /> 

          <ExpenseTransactions
  transactions={dashboardData?.last30daysExpense?.transactions || []}
  onSeeMore={() => navigate("/expense")}
/>

<Last30DaysExpenses
data={dashboardData?.last30daysExpense?.transactions || []
}
/> 

<RecentIncomeWithChart
data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) ||[] }
totalIncome={dashboardData?.totalIncome || 0}
/>

<RecentIncome
transactions={dashboardData?.last60DaysIncome?.transactions || [] }
onSeeMore={() => navigate("/income")}
/>
</div>
      </div>
    </DashboardLayout>
  );
};

export default Home;