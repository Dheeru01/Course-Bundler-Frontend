import { Box, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, Button, VStack, Input, ModalFooter } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileUploadCss } from '../../Auth/Register'

const CourseModal = ({isOpen , onClose , id, deleteButtonHandler, addLectureButtonHandler, courseTitle, lectures = [], loading}) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [video, setVideo] = useState("")
    const [videoPrev, setVideoPrev] = useState("")

    const changeVideoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setVideoPrev(reader.result);
            setVideo(file);
        };
    }

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setVideo('');
        setVideoPrev('');
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="full" scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{courseTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody p="16">
                    <Grid templateColumns={["1fr", "3fr 1fr"]}>
                        <Box px={["0", "16"]}>
                            <Box my="5">
                                <Heading>{courseTitle}</Heading>
                                <Heading size="sm" opacity={0.4}>#{id}</Heading>
                            </Box>
                            <Heading size="lg">Lectures</Heading>
                            {lectures.map((item, i) => (
                                <VideoCard
                                    key={item.id || i} // Add a unique key prop
                                    title={item.title}
                                    description={item.description}
                                    num={i + 1}
                                    lectureId={item._id}
                                    courseId={id}
                                    deleteButtonHandler={deleteButtonHandler}
                                    loading = {loading}
                                />
                            ))}
                        </Box>
                        <Box>
                            <form onSubmit={e => addLectureButtonHandler(e, id, title, description, video)}>
                                <VStack spacing={4}>
                                    <Heading size="md" textTransform="uppercase">Add Lecture</Heading>
                                    <Input
                                        focusBorderColor="purple.300"
                                        placeholder='Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Input
                                        focusBorderColor="purple.300"
                                        placeholder='Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Input
                                        accept='video/mp4'
                                        id='chooseAvatar'
                                        type='file'
                                        focusBorderColor='yellow.500'
                                        css={{'&::file-selector-button': { ...fileUploadCss, color: 'purple' }}}
                                        onChange={changeVideoHandler}
                                    />
                                    {videoPrev && (
                                        <video controlsList='nodownload' controls src={videoPrev}></video>
                                    )}
                                    <Button isLoading = {loading} w="full" colorScheme='purple' type='submit'>Upload</Button>
                                </VStack>
                            </form>
                        </Box>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CourseModal

function VideoCard({title, description, num, lectureId, courseId, deleteButtonHandler,loading}) {
    return (
        <Stack
            direction={["column", "row"]}
            my="8"
            borderRadius="lg"
            boxShadow="0 0 10px rgba(107,70,193,0.5)"
            justifyContent={["flex-start", "space-between"]}
            p={['4', '8']}
        >
            <Box>
                <Heading size="sm">#{num} {title}</Heading>
                <Text>{description}</Text>
            </Box>
            <Button isLoading={loading} color="purple.600" onClick={() => deleteButtonHandler(courseId, lectureId)}>
                <RiDeleteBin7Fill />
            </Button>
        </Stack>
    )
}
