import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  const { lectures , loading} = useSelector((state) => state.courses);

  if (user.role !== 'admin' && (!user.subscription || user.subscription.status !== 'active')) {
    return <Navigate to='/subscribe' />;
  }

  const handleLectureClick = (index) => {
    setLectureNumber(index);
  };

  return (
    loading ? <Loader /> : (
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <Box>
          <video
            width={'100%'}
            autoPlay
            controls
            controlsList='nodownload fullscreen noremoteplayback'
            disablePictureInPicture
            disableRemotePlayback
            src={lectures[lectureNumber].video.url}
          ></video>

          <Heading m={4}>{`# ${lectureNumber + 1} ${lectures[lectureNumber].title}`}</Heading>
          <Heading m={4} children='Description' />
          <Text m={4}>{lectures[lectureNumber].description}</Text>
        </Box>
      ) : (
        <Heading>No lectures found</Heading>
      )}

      {lectures && lectures.length > 0 && (
        <VStack>
          {lectures.map((element, index) => (
            <button
              onClick={() => handleLectureClick(index)}
              key={element._id}
              style={{
                width: '100%',
                padding: '1rem',
                textAlign: 'center',
                margin: 0,
                borderBottom: '1px solid rgba(0,0,0,0.2)',
              }}
            >
              <Text noOfLines={1}>
                #{index + 1} {element.title}
              </Text>
            </button>
          ))}
        </VStack>
      )}
    </Grid>
    )
  );
};

export default CoursePage;
