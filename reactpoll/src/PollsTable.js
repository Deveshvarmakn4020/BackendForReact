import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import './PollsTable.css';

const PollsTable = ({ polls }) => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'Numbers', width: 90 },
    { 
      field: 'question', 
      headerName: 'Poll Questions', 
      width: 300, 
      renderCell: (params) => (
        <span 
          onClick={() => navigate("/polldetail?id=" + params.row.QuestionID)} 
          style={{ cursor: 'pointer', color: 'black' }}
        >
          {params.value}
        </span>
      ) 
    },
    { field: 'votes', headerName: 'Total Votes', width: 150 },
    { field: 'tags', headerName: 'Tags', width: 350 },
  ];

  const rows = polls.length > 0 ? polls.map((poll, index) => ({
    id: index + 1,
    question: poll.Question,
    votes: Object.values(poll.OptionVote).reduce((a, b) => a + b, 0),
    tags: poll.Tags.join(", "),
    QuestionID: poll.QuestionID,
  })) : [];

  return (
    <div className="polls-table-container">
      <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSize={5} 
        rowsPerPageOptions={[5]} 
        components={{
          NoRowsOverlay: () => <div>No polls available</div>,
        }}
        disableSelectionOnClick
        autoHeight
        className="data-grid"
      />
    </div>
  );
};

export default PollsTable;
