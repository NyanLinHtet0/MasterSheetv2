import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './app/Navbar';
import Sheets from './pages/Sheets';
import Home from './pages/Home';
import View from './pages/View';
import { useSyncState } from './data_management/data_init'; // <-- Import the hook
import { useSyncManager } from './data_management/data_save';



function App() {
  // <-- Call the hook to fetch DB data
  const { appData, isLoading, error } = useSyncState(); 
  
  // Use our manager to handle drafts and the dirty map
  const {
    draftData,
    isDirty,
    handleInsertCorp,
    handleCancel,
    handleSave,
    handleUpdate,
    handleInsertRow,
    handleRemoveDirtyRow,
    setDraftData,
  } = useSyncManager(appData);
  // <-- Prevent app from rendering until DB data is downloaded
  if (isLoading) return <div style={{padding: '20px'}}>Initializing Database...</div>;
  if (error) return <div style={{padding: '20px'}}>Error: {error}</div>;

  return (
    <BrowserRouter>
      <Navbar isDirty={isDirty} onSave={handleSave} onCancel={handleCancel} />

      <div style={{ padding: "0" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Sheets"
            element={
              <Sheets
                corps={draftData?.corp_data || []}
                globalTree={draftData?.global_tree || []}
                assets={draftData?.assets || []}
                linkTable={draftData?.link_table || []}
                paymentTable={draftData?.payment_table || []}
                onAddCorp={handleInsertCorp}
                onQueueUpdate={handleUpdate}
                onQueueInsert={handleInsertRow}
                onRemoveDirtyRow={handleRemoveDirtyRow}
                setDraftData={setDraftData}
              />
            }
          />
          <Route
            path="/View"
            element={<View corps={draftData?.corp_data || []} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
