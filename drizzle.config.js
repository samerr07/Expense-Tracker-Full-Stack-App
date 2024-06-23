/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://Expense-Tracker_owner:5MgHsPnuYB8I@ep-orange-leaf-a1878mzw.ap-southeast-1.aws.neon.tech/Expense-Tracker?sslmode=require",
    }
  };