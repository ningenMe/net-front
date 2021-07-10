import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core';

export const ProfileCard = () => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    Furuta Taishi
                </Typography>
                <Typography variant="body2" component="p">
                    競技プログラミングが好きです。
                    現在はwebエンジニアをしています。
                    学生時代は物性物理と機械学習をしていました。
                </Typography>
            </CardContent>
        </Card>
    );
}
export default ProfileCard