import React, { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { addTask, updateTask } from '../../services/api';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';



const Modal = ({ isOpen, onClose, data }) => {

    Modal.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        data: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          _id: PropTypes.string,
        }),
      };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  // Sync props to state only when `data` changes
  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDescription(data.description || '');
      setId(data._id || '');
    } else {
      setTitle('');
      setDescription('');
      setId('');
    }
  }, [data]);

  if (!isOpen) return null;

  const handleAdd = async () => {
    try {
      const response = await addTask({ title, description });
      if (response?.success) {
        toast.success(response.message);
        setTitle('');
        setDescription('');
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateTask(id, { title, description });
      if (response?.success) {
        toast.success(response.message);
        setTitle('');
        setDescription('');
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{data ? 'Update Task' : 'Add Task'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              rows="3"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={data ? handleUpdate : handleAdd}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            {data ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
