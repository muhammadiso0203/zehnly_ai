import { TestCard } from "@/components/task-card"
import { TestFilterTabs } from "@/components/test-format"
import { TestManagementHeader } from "@/components/testCreate"

const ManageTest = () => {
  return (
    <>
    <TestManagementHeader/>
    <TestFilterTabs/>
    <TestCard/>
    </>
  )
}

export default ManageTest