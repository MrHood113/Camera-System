import ManageLayout from "../components/menu/ManageLayout";
import Title from "antd/es/typography/Title";
import DashboardFilters from "../components/DashboardFilters";
import { 
  CustomerAgeGenderChart,
  OsaRateChart, 
  PotentialLossTable, 
  RecoveryByShelfChart, 
  RecoveryCard, ShelfTable, 
  ShortageByShelfChart, 
  ShortageCard, 
  ShortageStatusChart, 
  TotalShelfCard 
} from "../charts";
import RecoveryStatusChart from "../charts/recovery/RecoveryStatusChart";
import CustomerOvertimeChart from "../charts/shortage/CustomerOvertimeChart";
import { Checkbox } from "antd";
import { useResponsiveLabels } from "../hooks";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const shelfOptions = [
  "(Blank)",
  "Beverage shelf",
  "Canned Goods Rack",
  "Clean Supplies Rack",
  "Coffee Shelf",
  "Cosmetic Shelf",
  "Diary Shelf",
  "Cosmetica Shelf",
  "Diarys Shelf",
  "Cosmeticd Shelf",
  "Diaryf Shelf",
  "Cosmeticg Shelf",
  "Diaryh Shelf",
];

const Dashboard: React.FC = () => {
  useResponsiveLabels();

  const labelCount = useSelector(
    (state: RootState) => state.chartResponsive.labelCount
  );

  return (
    <ManageLayout>
      <div className="grid grid-cols-12 gap-5 p-2">
        {/* OSA rate by shelf */}
        <div className="col-span-12 grid grid-cols-12 gap-4 border-2 border-gray-200 rounded-xl bg-white max-h-[800px] lg:max-h-[470px]">
          {/* LEFT */}
          <div className="col-span-12 md:col-span-12 lg:col-span-3 flex flex-col pt-4 pl-4 lg:pb-4 pr-4 lg:pr-0 min-h-0">
            <div className="mb-4 border-2 border-gray-200 rounded-xl">
              <TotalShelfCard />
            </div>
            {/* Checkbox filter */}
            <div className="flex-1 overflow-y-auto p-4 border-2 border-gray-200 rounded-xl">
              <div className="font-bold text-lg mb-4">Shelf name</div>
              <div className="">
                <Checkbox.Group
                  className="flex flex-col gap-2 mt-2"
                  defaultValue={shelfOptions}
                >
                  {shelfOptions.map((label) => (
                    <Checkbox key={label} value={label}>
                      {label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-12 lg:col-span-9 flex flex-col border-t-2 lg:border-t-0 lg:border-l-2 border-gray-200  min-h-0">
            {/* Search */}
            <div className="flex flex-col p-4 border-b">
              <div className="relative md:block items-center justify-center">
                <input
                    type="text"
                    placeholder="Search shelf name"
                    className="font-semibold pl-10 pr-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm bg-gray-200"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
                    </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col min-h-0 border-t pl-4 pr-2">
              {/* Chart title */}
              <div className="pt-4 pb-7">
                <span className="font-semibold text-2xl">
                  OSA Rate by Shelf
                </span>
              </div>
              {/* Chart */}
              <div className="flex-1 overflow-y-auto pb-3 pr-3">
                {[1, 2, 3, 4].map((_, idx) => (
                  <div key={idx}>
                    {idx > 0 && <hr className="border-t-2 border-gray-300 my-5" />}
                    <OsaRateChart labelCount={labelCount} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shelf table */}
        <div className="col-span-12 h-[340px] border-2 border-gray-200 rounded-xl bg-white shadow-sm px-5">
          <div>
            <Title level={4} className="py-3">Table detail</Title>
          </div>
          <div className=" overflow-hidden">
              <ShelfTable />
          </div>
        </div>

        {/* Shortage + Recovery charts */}
        <div className="col-span-12">
          {/* Title */}
          <div className="pb-2">
            <h5 className="font-semibold text-2xl py-3">Potential loss sales analysis</h5>
          </div>

          {/* Filters */}
          <div className="md:min-w-0">
            <DashboardFilters onFilterChange={(filters) => {
              console.log("Applied filters: ", filters);
            }} />
          </div>

          {/* Charts */}
          <div className="w-full min-h-0 lg:min-h-[500px] border-2 border-gray-200 rounded-xl bg-white shadow-sm grid grid-cols-12 gap-6">
            {/* Left */}
            <div className="col-span-12 lg:col-span-6 flex flex-col lg:border-r-2 lg:border-gray-200 py-4 pl-4 pr-6">
              {/* Top */}
              <div className="grid grid-cols-12 items-center gap-4 mb-4">
                {/* Card bên trái */}
                <div className="col-span-12 md:col-span-7 border-2 border-gray-200 rounded-xl">
                  <ShortageCard />
                </div>

                <div className="hidden md:block md:col-span-1"></div>

                {/* Mô tả bên phải */}
                <div className="col-span-12 md:col-span-4 flex items-center">
                  <span className="text-left text-xs">
                    <b>Shelf shortage rate </b>
                    = Total duration of shelf empty 
                    ratio higher than alerting threshold / 
                    total operating hours * 100
                  </span>
                </div>
              </div>
              
              <div>
                <div className="min-h-0">
                  <hr className="border border-gray-300 mb-5 mt-2"/>
                  <ShortageByShelfChart />
                </div>

                <div className="min-h-0">
                  <hr className="border border-gray-300 my-5"/>
                  <ShortageStatusChart 
                    labels={["Beverages", "Fresh food", "Household goods", "Packaged Food", "Personal care"]}
                    barData1={[60, 90, 40, 30, 70]}
                    barData2={[5, 20, 10, 15, 25]}
                    lineData={[20, 17, 30, 22, 16]}
                  />
                </div>

                <div className="min-h-0">
                  <hr className="border border-gray-300 my-5"/>
                  <CustomerAgeGenderChart />
                </div>

                <div className="min-h-0">
                  <hr className="border border-gray-300 my-5"/>
                  <CustomerOvertimeChart />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="col-span-12 lg:col-span-6 flex flex-col py-4 pr-4 pl-4 lg:pl-0 border-t-2 border-gray-200 lg:border-t-0">
              {/* Top */}
              <div className="grid grid-cols-12 items-center gap-4 pb-4">
                {/* Card*/}
                <div className="col-span-12 md:col-span-7 border-2 border-gray-200 rounded-xl">
                  <RecoveryCard />
                </div>

                <div className="hidden md:block md:col-span-1"></div>

                {/* Discription*/}
                <div className="col-span-12 md:col-span-4 flex item-center">
                  <span className="text-left text-xs">
                    <b>*On-time shelf recovery rate </b>
                    = (Number of on-time shelf recovery/Number of replenishment alerts)*100
                  </span>
                </div>
              </div>

              {/* Bottom */}
              <div className="">
                <div className="min-h-0">
                  <hr className="border border-gray-300 mb-5 mt-2"/>
                  <RecoveryByShelfChart />
                </div>

                <div className="min-h-0">
                  <hr className="border border-gray-300 my-5"/>
                  <RecoveryStatusChart 
                    labels={["Beverages", "Fresh food", "Household goods", "Packaged Food", "Personal care"]}
                    barData1={[60, 90, 40, 30, 70]}
                    barData2={[5, 20, 10, 15, 25]}
                    lineData={[57, 62, 56, 54, 57]}
                  />
                </div>

                <div className="max-h-[565px] pb-1">
                  <hr className="border border-gray-300 my-5"/>
                  <PotentialLossTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ManageLayout>
  );
};

export default Dashboard;
