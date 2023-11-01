from modules import extractor, mapeo, logic_manager, code_generator

if __name__ == '__main__':
    metadata = extractor.extract_metadata("resources/example_db.sql")
    data_map = mapeo.data_mapping(metadata)
    logic = logic_manager.manage_logic(metadata)
    code_generator.generate_code(data_map, logic)

