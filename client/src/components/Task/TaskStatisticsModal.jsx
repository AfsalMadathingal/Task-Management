import React from 'react';
import Modal from 'react-modal';
import TaskStatisticsChart from './TaskStatisticsChart';

const TaskStatisticsModal = ({ isOpen, onClose, statistics }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Task Statistics"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                },
            }}
        >
            <h2>Task Statistics</h2>
            <TaskStatisticsChart statistics={statistics} />
            <button onClick={onClose} style={{ marginTop: '20px' }}>Close</button>
        </Modal>
    );
};

Modal.setAppElement('#root'); // Bind the modal to your app root

export default TaskStatisticsModal;
