import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import {
  createPost,
  deletePost,
  fetchPosts,
} from "../../Redux/Dashboard/Dashboard";

// Post Display Component
const PostDisplay: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingPost, setCreatingPost] = useState<boolean>(false); // Loader for creating post
  const [deletingPost, setDeletingPost] = useState<boolean>(false); // Loader for deleting post

  const [posts, setPosts] = useState<any[]>([]); // State for posts data
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchPosts()).unwrap();
      if (response?.success) {
        setPosts(response.data); // Set fetched posts
      } else {
        setError("Failed to load posts.");
      }
    } catch (err) {
      setError("Error fetching posts.");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleOpenModal = (post: any) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  const handleDelete = async () => {
    if (selectedPost) {
      setDeletingPost(true); // Start deleting process
      try {
        // Dispatch the deletePost action
        const response = await dispatch(
          deletePost({ postId: selectedPost._id })
        ).unwrap();
        if (response?.success) {
          // Remove deleted post from the state
          setPosts(posts.filter((post) => post._id !== selectedPost._id));
        } else {
          setError("Failed to delete post.");
        }
      } catch (err) {
        setError("Error deleting post.");
        console.error(err);
      } finally {
        setDeletingPost(false); // End deleting process
        setOpenDeleteModal(false);
        handleCloseModal();
      }
    }
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleCreatePost = async () => {
    if (newPostText.trim()) {
      setCreatingPost(true); // Start creating process
      const newPost = {
        text: newPostText,
        userId: "123", // For demo purposes, use real user data
        first_name: "New",
        last_name: "User",
        admin: false,
      };

      try {
        // Dispatch the createPost action
        const response = await dispatch(createPost(newPost)).unwrap();
        if (response?.success) {
          fetchData();
          // Add new post to the state
          //setPosts([response.data, ...posts]);
          setNewPostText(""); // Clear input
          setOpenCreateModal(false); // Close modal
        } else {
          setError("Failed to create post.");
        }
      } catch (err) {
        setError("Error creating post.");
        console.error(err);
      } finally {
        setCreatingPost(false); // End creating process
      }
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Post Management
      </Typography>

      {/* Display Loading State */}
      {loading && <CircularProgress />}

      {/* Display Error State */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display Posts */}
      {!loading && !error && (
        <>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Total Posts: {posts.length}</strong>
          </Typography>

          {/* CTA Button to Create Post */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateModal(true)}
            style={{ marginBottom: "20px" }}
            disabled={creatingPost} // Disable if creating post
          >
            {creatingPost ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Create a Post"
            )}
          </Button>

          {/* Post Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Post Text</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts
                  ?.slice()
                  ?.reverse()
                  ?.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell>{post.text.slice(0, 20)}...</TableCell>{" "}
                      {/* Display first 20 characters */}
                      <TableCell>{`${post.first_name} ${post.last_name}`}</TableCell>
                      <TableCell>{post.admin ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleOpenModal(post)}
                          color="primary"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Post Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            ...modalStyle,
            width: "80%",
            maxWidth: "600px",
            padding: "30px",
          }}
        >
          <Button
            onClick={handleCloseModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#555",
            }}
          >
            <CloseIcon />
          </Button>
          <Typography variant="h5" gutterBottom>
            Post Details
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            <strong>User:</strong>{" "}
            {`${selectedPost?.first_name} ${selectedPost?.last_name}`}
          </Typography>
          <Typography
            variant="body1"
            style={{
              marginBottom: "20px",
              backgroundColor: "#f4f4f4",
              padding: 16,
            }}
          >
            <strong>Text:</strong> {selectedPost?.text}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginBottom: "10px" }}
          >
            <strong>Created At:</strong>{" "}
            {new Date(selectedPost?.createdAt).toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginBottom: "20px" }}
          >
            <strong>Updated At:</strong>{" "}
            {new Date(selectedPost?.updatedAt).toLocaleString()}
          </Typography>

          {/* Delete Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenDeleteModal}
            style={{
              backgroundColor: "#d32f2f",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              textTransform: "none",
              //disabled: deletingPost, // Disable if deleting post
            }}
          >
            {deletingPost ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              <>
                <DeleteIcon style={{ marginRight: "8px" }} />
                Delete Post
              </>
            )}
          </Button>
        </Box>
      </Modal>

      {/* Create Post Modal */}
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Box
          sx={{
            ...modalStyle,
            width: "60%",
            padding: "30px",
          }}
        >
          <Button
            onClick={() => setOpenCreateModal(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#555",
            }}
          >
            <CloseIcon />
          </Button>
          <Typography variant="h5" gutterBottom>
            Create a Post
          </Typography>
          <TextField
            fullWidth
            label="Post Content"
            multiline
            rows={4}
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            variant="outlined"
            style={{ marginBottom: "20px" }}
            disabled={creatingPost} // Disable if creating post
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
            disabled={creatingPost || !newPostText.trim()} // Disable if creating post or empty text
            startIcon={
              creatingPost ? (
                <CircularProgress size={24} color="secondary" />
              ) : null
            }
          >
            {creatingPost ? "Creating..." : "Create Post"}
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6">
            Are you sure you want to delete this post?
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              disabled={deletingPost} // Disable if deleting post
            >
              {deletingPost ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                "Delete"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

// Styling for the modals
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: 24,
};

export default PostDisplay;
