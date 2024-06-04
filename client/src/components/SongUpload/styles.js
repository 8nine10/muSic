export const useStyles = () => {
    return {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
        },
        paper: {
            my: 3,
            p: 4,
            px: 10,
            backgroundColor: 'secondary.main',
            color: 'primary.dark',
        },
        formText: {
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            my: 1,
            color: 'primary.main',
        },
        fileInput: {
            '--Grid-borderWidth': '1px',
            border: 'var(--Grid-borderWidth) solid',
            borderColor: 'secondary.dark',
            borderRadius: 2,
            color: 'secondary.dark',
            backgroundColor: 'secondary.main',
        },
        submit: {
            '--Grid-borderWidth': '1px',
            border: 'var(--Grid-borderWidth) solid',
            borderColor: 'secondary.dark',
            borderRadius: 2,
            color: 'secondary.dark',
            backgroundColor: 'secondary.main',
            my: 3,
        }
    }
}