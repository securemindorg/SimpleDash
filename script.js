// Time-based welcome message function
function getTimeBasedMessage(messages) {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return messages.morning;
    } else if (hour >= 12 && hour < 17) {
        return messages.afternoon;
    } else if (hour >= 17 && hour < 21) {
        return messages.evening;
    } else {
        return messages.night;
    }
}

async function loadContent() {
    try {
        const response = await fetch('links.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        
        const container = document.getElementById('links-container');
        container.className = 'main-container';
        
        // Create main content wrapper
        const mainContent = document.createElement('div');
        mainContent.className = 'main-content';
        container.appendChild(mainContent);
        
        // Create welcome message section
        if (data.welcome_messages) {
            const welcomeSection = document.createElement('div');
            welcomeSection.className = 'welcome-section';
            const message = document.createElement('h1');
            message.className = 'welcome-message';
            message.textContent = getTimeBasedMessage(data.welcome_messages);
            welcomeSection.appendChild(message);
            mainContent.appendChild(welcomeSection);
        }
        
        // Create sections wrapper
        const sectionsWrapper = document.createElement('div');
        sectionsWrapper.className = 'sections-wrapper';
        mainContent.appendChild(sectionsWrapper);
        
        // Create links and calendar sections side by side
        const linksSection = document.createElement('div');
        linksSection.className = 'links-section';
        const calendarSection = document.createElement('div');
        calendarSection.className = 'calendar-section';
        
        sectionsWrapper.appendChild(linksSection);
        sectionsWrapper.appendChild(calendarSection);
        
        // Create upper and lower sections
        const upperSection = document.createElement('div');
        const lowerSection = document.createElement('div');
        upperSection.className = 'upper-section';
        lowerSection.className = 'lower-section';
        linksSection.appendChild(upperSection);
        linksSection.appendChild(lowerSection);

        // Create docker services section
        if (data.docker_services) {
            // Add title for docker services
            const dockerTitle = document.createElement('h2');
            dockerTitle.className = 'docker-title';
            dockerTitle.textContent = 'APPLICATIONS';
            upperSection.appendChild(dockerTitle);

            const dockerGrid = document.createElement('div');
            dockerGrid.className = 'docker-grid';
            
            data.docker_services.forEach(service => {
                const serviceElement = document.createElement('a');
                serviceElement.className = 'link-item docker-service';
                serviceElement.href = service.url;
                serviceElement.target = '_blank';
                
                const contentWrapper = document.createElement('div');
                contentWrapper.className = 'content-wrapper';

                const iconWrapper = document.createElement('div');
                iconWrapper.className = 'icon-wrapper';
                
                const icon = document.createElement('i');
                icon.className = `mdi mdi-${service.icon}`;
                iconWrapper.appendChild(icon);
                
                const textWrapper = document.createElement('div');
                textWrapper.className = 'text-wrapper';

                const name = document.createElement('div');
                name.className = 'link-name';
                name.textContent = service.name;
                
                if (service.description) {
                    const description = document.createElement('div');
                    description.className = 'link-description';
                    description.textContent = service.description;
                    textWrapper.appendChild(name);
                    textWrapper.appendChild(description);
                } else {
                    textWrapper.appendChild(name);
                }
                
                contentWrapper.appendChild(iconWrapper);
                contentWrapper.appendChild(textWrapper);
                serviceElement.appendChild(contentWrapper);
                dockerGrid.appendChild(serviceElement);
            });
            
            upperSection.appendChild(dockerGrid);
        }

        // Create three columns for lower section
        const leftColumn = document.createElement('div');
        const middleColumn = document.createElement('div');
        const rightColumn = document.createElement('div');
        leftColumn.className = 'column';
        middleColumn.className = 'column';
        rightColumn.className = 'column';
        lowerSection.appendChild(leftColumn);
        lowerSection.appendChild(middleColumn);
        lowerSection.appendChild(rightColumn);

        // Handle calendar section
        if (data.calendars && data.calendars.length > 0) {
            const tabsContainer = document.createElement('div');
            tabsContainer.className = 'calendar-tabs';
            
            const contentContainer = document.createElement('div');
            contentContainer.className = 'calendar-content';
            
            data.calendars.forEach((calendar, index) => {
                const tab = document.createElement('button');
                tab.className = 'calendar-tab';
                if (index === 0) tab.classList.add('active');
                tab.textContent = calendar.name;
                tab.onclick = () => {
                    document.querySelectorAll('.calendar-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.calendar-iframe').forEach(c => c.style.display = 'none');
                    tab.classList.add('active');
                    document.getElementById(`calendar-${index}`).style.display = 'block';
                };
                tabsContainer.appendChild(tab);
                
                const iframe = document.createElement('iframe');
                iframe.id = `calendar-${index}`;
                iframe.className = 'calendar-iframe';
                iframe.src = calendar.url;
                iframe.style.display = index === 0 ? 'block' : 'none';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('loading', 'lazy');
                contentContainer.appendChild(iframe);
            });
            
            calendarSection.appendChild(tabsContainer);
            calendarSection.appendChild(contentContainer);
        }

        // Group links by category
        const linksByCategory = {};
        data.links.forEach(link => {
            if (!linksByCategory[link.category]) {
                linksByCategory[link.category] = [];
            }
            linksByCategory[link.category].push(link);
        });

        // Function to create category section
        const createCategorySection = (category) => {
            if (linksByCategory[category]) {
                const categorySection = document.createElement('div');
                categorySection.className = 'category-section';
                
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                linksByCategory[category].forEach(link => {
                    const linkElement = document.createElement('a');
                    linkElement.className = 'link-item';
                    linkElement.href = link.url;
                    linkElement.target = '_blank';
                    
                    const contentWrapper = document.createElement('div');
                    contentWrapper.className = 'content-wrapper';

                    const iconWrapper = document.createElement('div');
                    iconWrapper.className = 'icon-wrapper';
                    iconWrapper.style.width = '24px';
                    iconWrapper.style.display = 'inline-flex';
                    iconWrapper.style.justifyContent = 'center';
                    
                    const icon = document.createElement('i');
                    icon.className = `mdi mdi-${link.icon}`;
                    iconWrapper.appendChild(icon);
                    
                    const textWrapper = document.createElement('div');
                    textWrapper.className = 'text-wrapper';

                    const name = document.createElement('div');
                    name.className = 'link-name';
                    name.textContent = link.name;
                    
                    if (link.description) {
                        const description = document.createElement('div');
                        description.className = 'link-description';
                        description.textContent = link.description;
                        textWrapper.appendChild(name);
                        textWrapper.appendChild(description);
                    } else {
                        textWrapper.appendChild(name);
                    }
                    
                    contentWrapper.appendChild(iconWrapper);
                    contentWrapper.appendChild(textWrapper);
                    linkElement.appendChild(contentWrapper);
                    categorySection.appendChild(linkElement);
                });

                return categorySection;
            }
            return null;
        };

        // Populate columns based on configuration
        if (data.columns) {
            // Left column
            if (data.columns.left) {
                data.columns.left.forEach(category => {
                    const section = createCategorySection(category);
                    if (section) leftColumn.appendChild(section);
                });
            }
            
            // Middle column
            if (data.columns.middle) {
                data.columns.middle.forEach(category => {
                    const section = createCategorySection(category);
                    if (section) middleColumn.appendChild(section);
                });
            }
            
            // Right column
            if (data.columns.right) {
                data.columns.right.forEach(category => {
                    const section = createCategorySection(category);
                    if (section) rightColumn.appendChild(section);
                });
            }
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadContent); 