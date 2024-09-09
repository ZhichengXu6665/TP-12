// src/components/NotificationBell.js
import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './NotificationBell.css';

function NotificationBell({ expiredItems = [] }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="notification-bell">
            <IconButton
                color="inherit"
                onClick={handleClick}
            >
                <Badge badgeContent={expiredItems.length || 0} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 400,
                        width: '350px', // 调整宽度以容纳表格内容
                        padding: '10px', // 增加内边距
                    },
                }}
            >
                {expiredItems.length > 0 ? (
                    <TableContainer style={{ maxHeight: 300, overflow: 'auto' }}> {/* 移除 component={Paper} */}
                        <Table size="small" aria-label="expired items table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Item Name</strong></TableCell>
                                    <TableCell><strong>Expiry Date</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expiredItems.map((item, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div style={{ padding: '10px', textAlign: 'center' }}>No expired items</div>
                )}
            </Menu>
        </div>
    );
}

export default NotificationBell;
