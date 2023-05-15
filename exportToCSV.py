def main():
    communities = [
        {"id": "f442219d-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15", "name": 'all',
            "description": 'All posts from all communities'},
        {
            "id": "f4422196-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15",
            "name": 'CodeParadise',
            "description": 'All about coding & development!'
        },
        {
            "id": "f4422197-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15",
            "name": 'foodies',
            "description": 'We love food and we love talking about it'
        },
        {
            "id": "f4422198-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15",
            "name": 'placements',
            "description": 'Desperate for a job? Discuss everything related to scoring a job, here'
        },
        {
            "id": "f4422199-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15",
            "name": 'gaming',
            "description": 'Discussions on new games, events, and more!'
        },
        {
            "id": "f442219a-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15",
            "name": 'TechTalk',
            "description": 'Engage in conversations about the latest technology trends, innovations, and troubleshooting tips.'
        },
        {
            "id": "f442219b-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15",
            "name": 'CreativeCorner',
            "description": 'Share and explore artistic endeavors, including writing, painting, photography, and more.'
        },
        {
            "id": "f442219c-f2ac-11ed-bbdd-21ad6a75ddf6", "creationDate": "2023-05-15",
            "name": 'ArtAppreciation',
            "description": 'Celebrate and discuss various forms of art, including painting, sculpture, and architecture.'
        },
    ]

    print('id,name,creationDate,about')
    for d in communities:
        print(f'{d["id"]},{d["name"]},{d["creationDate"]},\"{d["description"]}\"')


if __name__ == "__main__":
    main()
